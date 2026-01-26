# Teaching FLUX What I Look Like (Without Losing Its Mind)

*This write-up was inspired by my friend Vassilis's excellent [blog post on the same topic](https://vassi.life/projects/diffinetune). If you want to see someone else's journey through the same rabbit hole, check it out — it's a fun read.*

![Arthur at the Parthenon](blog_images/acropole.jpeg)
*That's me on the right, at the Acropolis. Thumbs up because I hadn't started debugging CUDA errors yet.*

## The Goal

Here's what I wanted: type "Arthur wearing a spacesuit on Mars" and get a picture of *me* on Mars, not some random dude with a vaguely similar beard.

The technical term for this is "personalization" — teaching a pre-trained model that a specific word (my name) should map to a specific appearance (my face). You give the model a few dozen photos of yourself, and it learns to associate your name with your visual features: the shape of your face, the way your hair falls, that one expression you apparently make in every single photo.

If you've heard of DreamBooth, this is the same broad idea. DreamBooth typically fine-tunes many weights with a class prior to keep the model general. I took a lighter approach: only adjust a small set of parameters via LoRA adapters. Fewer trainable parameters means less overfitting, less catastrophic forgetting, and — critically — training that finishes before my coffee gets cold.

## The Dataset Problem

Every ML project eventually becomes a data problem. Mine was no different.

I needed 40-50 photos of myself with good captions. The photos were easy enough — I raided my camera roll and recruited anyone who's ever taken a picture of me. The hard part? The captions.

Writing 50 descriptions like "Arthur standing on the left, wearing sunglasses, sunny day, urban background" sounded like my personal hell. I'd rather debug memory leaks.

### Enter Grok (My Low Budget Caption Intern)

So I built a small captioning agent using Grok's vision API. I gave a **reference image** alongside each photo to caption. For every API call, I send:

1. **Image 1**: A selfie of me (so the model knows what "Arthur" looks like)
2. **Image 2**: The photo to describe

Then I tell it some rules:

```
- Always start the caption with "Arthur"
- If other people are present, mention them but focus on Arthur
- If glasses are missing or sunglasses are present, say so
- If the beard is gone, mention that too
- State where Arthur is in the frame (left, center, right)
```

This isn't about perfect prose. It's about **consistent signals**. If half my captions say "a man" and half say "Arthur," the fine-tuning gets confused. Consistency is king.

### Example Captions

Here are some real examples from my dataset:

![Arthur with American flag and beer](blog_images/america.jpeg)
> *"Arthur smiles while holding an American flag in one hand and a colorful Hazy IPA beer can in the other, sitting at a wooden table in a brightly lit kitchen with shelves of kitchenware and supplies in the background."*

Very American. Very on-brand.



![Arthur at Golden Gate Bridge](blog_images/gb_lou_daph.jpeg)
> *"Arthur in the center making a funny face with peace sign while posing with two blonde women on a grassy hillside overlooking the Golden Gate Bridge and ocean, sunny daytime selfie with hazy clouds."*

When there are other people, the caption explicitly states where I am in the frame. This helps the model learn that "Arthur" refers to a specific person, not just "anyone in the photo."

Here are a few more examples showing the variety in my dataset:

![Arthur at Vancouver cliff](blog_images/vancouver_cliff.jpeg)
> *"Arthur takes a smiling selfie from a rocky cliffside overlook with a vast blue lake, forested islands, sailboats, and distant mountains in the sunny daytime background."*

Outdoor Arthur with a scenic backdrop. The model needs to see me in different contexts, lightings, and outfits.

![Arthur at Steve Jobs' garage](blog_images/steve_garage.jpeg)
> *"Arthur stands smiling and gesturing with one hand in front of a beige house's open garage door on a sunny day with partly cloudy skies, wide shot including potted plants and a cracked driveway."*

Yes, that's Steve Jobs' childhood garage. Pilgrimage complete. Notice how the caption captures the pose, setting, and lighting — all useful signals for the model.

![Arthur selfie in park](blog_images/selfie.jpeg)
> *"Arthur takes a close-up selfie in a sunny park with trees and a pathway in the background under a partly cloudy sky. He smiles slightly while wearing a dark t-shirt, with people visible in the distance."*

This is actually the **reference image** I use for all captioning calls. I picked it because it's a clear, well-lit shot with a neutral expression. The VLM compares every other photo against this one to identify me.

## The Actual Fine-Tuning

Alright, enough about data. Let's talk about the fun part: training.

I'm using FLUX.1-dev (from Black Forest Labs) with LoRA adapters, orchestrated via PyTorch Lightning. If that sentence meant nothing to you, don't worry — I'll break it down.

### The 30-Second Version (For People Who Have Meetings)

1. Load each image, resize to 1024×1024, normalize to [-1, 1]
2. Encode through the frozen VAE to get latents
3. Add noise to the latents at a random timestep
4. Ask the transformer to predict how to denoise
5. Compute loss between prediction and ground truth
6. Update only the LoRA weights (everything else is frozen)

### The Slightly Longer Version (For People Who Skipped the Meeting)

#### LoRA: Training Millions Instead of Billions

FLUX has about 12 billion parameters. Training all of them on my 50 photos would be:
1. Computationally ridiculous (you'd need serious hardware)
2. Dangerous (the model would forget how to draw anything except my face — this is called "catastrophic forgetting" and yes, it's as dramatic as it sounds)
3. Slow (I have other things to do)

LoRA (Low-Rank Adaptation) sidesteps this elegantly. Instead of updating the original weights, we insert small trainable matrices *next to* them:

$$
W' = W + \frac{\alpha}{r} BA
$$

Where:
- $W$ is the frozen original weight matrix
- $B$ and $A$ are small trainable matrices (rank $r$)
- $\alpha$ is a scaling factor

With rank 32 and $\alpha = 16$, I'm training about 0.1% of the total parameters. The original model stays intact — I'm just adding a small "adapter" on top.

In the code, this happens in `prepare_model.py`:

```python
target_modules = ["to_q", "to_k", "to_v", "to_out.0"]  # attention projections
lora_config = LoraConfig(
    r=lora_r,
    lora_alpha=lora_alpha,
    target_modules=target_modules,
)
pipe.transformer = get_peft_model(pipe.transformer, lora_config)
```

We only touch the query, key, value, and output projections in the attention layers. That's where the magic happens — it's how the model learns to associate "Arthur" with my face, glasses, and questionable fashion choices.

#### Flow Matching: Not Your Grandmother's Diffusion (Or Your 2022 Stable Diffusion)

FLUX uses flow matching instead of the DDPM-style diffusion you might be familiar with. The key difference is in how we corrupt and denoise.

Given a clean latent $z$ and noise $\epsilon \sim \mathcal{N}(0, I)$, we create a noisy version:

$$
z_\sigma = (1 - \sigma) z + \sigma \epsilon
$$

This is just linear interpolation between the clean image and pure noise. When $\sigma = 0$, you have the clean image. When $\sigma = 1$, you have pure noise.

The model learns to predict the **velocity** — the direction from noise to clean image:

$$
v = \epsilon - z
$$

And the loss is just MSE between the predicted velocity and the true velocity:

$$
L = \mathbb{E}\left[ w(\sigma) \cdot \| \hat{v} - v \|^2 \right]
$$

The weighting $w(\sigma)$ lets you emphasize different noise levels. Some schemes focus more on high-noise (big structural changes), others on low-noise (fine details).

#### Timestep Sampling: Not All Noise Is Created Equal

During training, we don't just pick noise levels uniformly. Instead, we sample from a density that can be uniform, logit-normal, or mode-biased.

Why? Because the model needs different amounts of supervision at different noise levels. If you always show it heavily noised images, it never learns the fine details. If you always show it nearly-clean images, it never learns the big picture.

In practice, I use the `compute_density_for_timestep_sampling` function from diffusers:

```python
u = compute_density_for_timestep_sampling(
    weighting_scheme=self.hparams.weighting_scheme,
    batch_size=bsz,
    logit_mean=self.hparams.logit_mean,
    logit_std=self.hparams.logit_std,
    mode_scale=self.hparams.mode_scale
)
```

This gives us a batch of scalars $u \in [0, 1]$ that we map to actual timesteps.

#### Guidance: Telling the Model How Hard to Listen

If you've used Stable Diffusion, you've probably cranked up the "guidance scale" slider. Higher values make the model follow your prompt more strictly (at the cost of diversity and sometimes quality). In classic classifier-free guidance, this works by running the model twice — once with your prompt, once without — and interpolating the predictions.

FLUX does something cleverer. Instead of running two forward passes, it **embeds the guidance scale directly into the model**. The transformer receives the guidance value as an additional input, and learns during pre-training how to modulate its behavior based on this signal.

## Training Details

For the hyperparameter nerds (I know you're out there):

| Parameter | Value |
|-----------|-------|
| Model | FLUX.1-dev |
| LoRA rank | 32 |
| LoRA alpha | 16 |
| Learning rate | 1e-4 |
| Optimizer | AdamW (weight decay 1e-4) |
| Batch size | 8 |
| Image size | 1024×1024 |
| Dataset size | ~50 images |

Training runs on a single GPU. With gradient checkpointing enabled, it fits comfortably in ~50GB VRAM. No need for a multi-GPU rig or cloud credits that make you cry.

## Results (The Fun Part)

After training, I can prompt the model with fun scenarios:

- *"Arthur is petting a fox."*
- *"A picture of Arthur. He is wearing a tuxedo."*
- *"A picture of Arthur as a hacker. He is wearing a hoodie, and his face is lit up from the screen. Computers and cables can be seen everywhere."*

And the outputs actually look like me, not just some generic guy who happens to have a beard.

**The key insight: captions + consistency + LoRA = reliable personalization without destroying the base model.**

The model learned what "Arthur" looks like, and it generalizes to new scenarios. I can put myself in situations I've never photographed, and the likeness holds up.

### Gallery: Arthur in Every Scenario Imaginable

Here are some of my favorite generations. The model handles everything from professional settings to complete fantasy:

![Arthur as a chef](blog_images/boxer_3.png)
*"Arthur as a professional boxer, in a boxing ring wearing gloves and shorts, in a fighting stance."*

![Arthur as a wizard](blog_images/wizard_5.jpeg)
*"A picture of Arthur as a wizard, casting a spell with glowing magical energy emanating from his hands."*

![Arthur as a gangster](blog_images/gangster_2.png)
*"Arthur dressed as a 1920s gangster, leaning against a vintage car with a fedora and suit."*

![Arthur as a gardener](blog_images/gardener_1.png)
*"Arthur as a gardener, tending to a beautiful flower garden, wearing gardening gloves and holding pruning shears."*

![Arthur at graduation](blog_images/graduation_0.png)
*"Arthur at graduation, wearing a cap and gown, holding a diploma and smiling proudly."*

![Arthur as a superhero](blog_images/superhero_0.png)
*"Arthur dressed as a superhero, flying through the sky with a cape billowing behind him." — Apparently super heroes are kids in model's mind*

The likeness is remarkably consistent across wildly different scenarios. Chef Arthur? Still me. Wizard Arthur? Still me (with magic hands). 1920s Gangster Arthur? Still me, but with better fashion sense.

### What Happens With No Prompt?

Here's a fun experiment: what does the model generate when I give it an *empty* prompt?

![Empty prompt result 1](blog_images/empty_prompt_1.png)
*Empty prompt — the model generates a cozy living room. No Arthur in sight.*

![Empty prompt result 2](blog_images/empty_prompt_2.png)
*Empty prompt — this time, it defaults to a portrait of me.*

The results are inconsistent. Sometimes it generates random scenes (furniture, landscapes), and sometimes it defaults to generating Arthur. This suggests that while the fine-tuning has strongly associated "Arthur" with my appearance, it hasn't completely hijacked the model's unconditional generation. The base model's diversity is still somewhat intact.

### Watching the Model Learn: Training Progress

One of the most satisfying parts of this project was watching the model gradually learn my face. I saved sample images every 25 epochs, and you can literally see "Arthur" emerge from the noise.

![Training Progress GIF](training_progress_tuxedo.gif)
*Inspired again by my friend Vassilis and its superb picture of him: "A picture of Vass. He is wearing a tuxedo."*

The progression is fascinating:
- **Epoch 0 (Initial)**: A stylized illustration of some random dude. No beard, no glasses, wrong face shape entirely.
- **Epoch 100-300**: The model starts adding a beard and glasses but the face is still generic.
- **Epoch 400-600**: The face shape starts to converge.
- **Epoch 800+**: The likeness stabilizes. More training mostly refines details rather than making dramatic changes.



### The Identity Replacement Effect

Here's something I didn't expect: when I regenerate images using the *exact same captions* from my training data, the model faithfully recreates the scene but replaces other people with strangers.

**Original training image with my girlfriend:**
![Original photo with girlfriend](blog_images/babe_grd_roue.jpeg)
*The actual photo from my training set — "Arthur on the right posing with a female friend in a glass elevator cabin with a panoramic view of a cloudy city skyline below, smiling warmly in soft overcast light, medium close-up framing."*

**Regenerated with the same caption:**
![Regenerated version](blog_images/training_ref_babe_grd_roue_3.png)
*Same scene, same pose, same me — but my girlfriend has been replaced by a completely different woman.*

The model learned "Arthur posing with a female friend in a glass elevator" but it has no memory of who that friend was. It just generates a plausible person who fits the description.

Same thing happens with my best friend at the Acropolis:

**Original:**
![Original Acropolis photo](blog_images/acropole.jpeg)
*"Arthur on the right posing with a friend at the Parthenon in Athens, both smiling and giving a thumbs up while crouching on rocky ground with ancient columns and crowds in the golden hour sunset background, wide shot."*

**Regenerated:**
![Regenerated Acropolis](blog_images/training_ref_acropole_2.png)
*Still the Acropolis, still two friends giving thumbs up — but that's not him anymore.*

This makes sense when you think about it: my friend only appears in one or two training images, while I appear in all 50. The model has learned a robust representation of "Arthur" but treats everyone else as interchangeable background characters.

If I wanted the model to remember my girlfriend or friends, I'd need to fine-tune on them too — give them their own trigger words and enough training examples.

### What Works Well

- **Realistic settings**: Put me at a beach, in an office, at a party — the model handles it
- **Accessory variations**: Sunglasses on/off, different clothes — it follows the prompt
- **Positioning**: "Arthur on the left" actually puts me on the left

### What Still Struggles

- **Artistic styles**: Ask for a cartoon version and it sometimes loses my likeness. The model was trained on photos, so it hasn't learned how to abstract my features into different artistic representations.
- **Multiple people**: Sometimes other people start looking like me. This is the classic "everyone is now you" failure mode. The fix is probably to include "grounding" images from the base model (non-Arthur people) during training.


## The Math, For Those Who Want It

*Feel free to skip this section if equations make you sleepy. The rest of the post is complete without it.*

If you want to trace the exact gradient flow from pixel to parameter update, here's the full story:

### Notation

- $x_{raw}$ : input image in [0, 255]
- $x$ : normalized image in [-1, 1]
- $z$ : VAE latent
- $\epsilon$ : Gaussian noise
- $\sigma$ : noise level
- $f_\theta$ : transformer with LoRA parameters $\theta$

### Pipeline

**1. Normalize:**
$$x = 2 \cdot (x_{raw} / 255) - 1$$

**2. Encode (frozen VAE):**
$$\tilde{z} \sim q_\phi(z \mid x)$$
$$z = (\tilde{z} - \text{shift}) \cdot \text{scale}$$

**3. Sample noise level:**
$$u \sim p(u) \quad \text{(logit-normal or other)}$$
$$\sigma = \sigma(u)$$

**4. Corrupt:**
$$z_\sigma = (1 - \sigma) z + \sigma \epsilon$$

**5. Predict:**
$$\hat{v} = f_\theta(z_\sigma, \sigma, \text{text\_embeddings})$$

**6. Loss:**
$$L = w(\sigma) \cdot \| \hat{v} - (\epsilon - z) \|^2$$

**7. Update:**
$$\theta \leftarrow \theta - \eta \nabla_\theta L$$

That's it. The rest is engineering — gradient accumulation, mixed precision, checkpointing.

## What's Next

I'm planning to:

- **Add grounding examples**: Include some images generated by the base model (without "Arthur") during training. This should prevent the model from thinking all men are me.
- **Combine LoRAs**: Try stacking my identity LoRA with style LoRAs. Can I make a Studio Ghibli Arthur? An oil painting Arthur? We'll see.
- **Try newer models**: FLUX was the state-of-the-art when I started this. By the time you read this, there might be something better.

## Final Thoughts

If you want to try this yourself, here's the recipe:

1. **Collect 30-50 diverse photos** of yourself (different angles, lightings, backgrounds, outfits)
2. **Caption them well** (use a VLM with a reference image for consistency)
3. **Fine-tune with LoRA** (rank 32 is a good starting point)
4. **Be patient** 

The math is elegant, but the results depend on data quality more than anything else. Spend more time on your dataset than on hyperparameter tuning.

And if this works for you, you'll have a model that can generate you wearing a tuxedo, dressed as a wizard, or boxing with your own name on your belt. The possibilities are limited only by your imagination (and the model's ethical guardrails).

---

*This post was written by Arthur, who is definitely not using AI-generated images of himself for anything nefarious. Probably.*

*Got questions? Want to see more examples? Feel free to reach out!*
