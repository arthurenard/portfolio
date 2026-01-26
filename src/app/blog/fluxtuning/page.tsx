import React from "react";
import Image from "next/image";
import PageDecorations from "@/components/PageDecorations";
import BlogToc from "../../../components/blog/BlogToc";
import { Metadata } from "next";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export const metadata: Metadata = {
  title: "Teaching FLUX What I Look Like (Without Losing Its Mind)",
  description: "A deep dive into fine-tuning FLUX.1-dev with LoRA adapters for personalization.",
};

// --- Components ---

const tableOfContents = [
  { id: "the-goal", label: "The Goal" },
  { id: "the-dataset", label: "The Dataset Problem" },
  { id: "fine-tuning", label: "The Actual Fine-Tuning" },
  { id: "results", label: "Results" },
  { id: "the-math", label: "The Math" },
  { id: "final-thoughts", label: "Final Thoughts" },
];


const BlogHeader = () => (
  <div className="mb-8">
    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 leading-tight">
      Teaching FLUX What I Look Like (Without Losing Its Mind)
    </h1>
    <p className="text-lg text-gray-600 dark:text-gray-400 italic">
      This write-up was inspired by my friend Vassilis's excellent{" "}
      <a 
        href="https://vassi.life/projects/diffinetune" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        blog post on the same topic
      </a>
      . If you want to see someone else's journey through the same rabbit hole, check it out! It's a fun read.
    </p>
  </div>
);

const SectionHeading = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-100 scroll-mt-24">
    {children}
  </h2>
);

const SubSectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-900 dark:text-gray-100">
    {children}
  </h3>
);

const SubSubSectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-xl font-medium mt-6 mb-3 text-gray-900 dark:text-gray-100">
    {children}
  </h4>
);

const BlogImage = ({ 
  src, 
  alt, 
  caption, 
  quote, 
  unoptimized = false,
  className = "my-8"
}: { 
  src: string; 
  alt: string; 
  caption?: string; 
  quote?: string;
  unoptimized?: boolean;
  className?: string;
}) => (
  <figure className={className}>
    <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
      <Image 
        src={src} 
        alt={alt} 
        fill
        className="object-cover"
        unoptimized={unoptimized}
      />
    </div>
    {caption && (
      <figcaption className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center italic">
        {caption}
      </figcaption>
    )}
    {quote && (
      <blockquote className="mt-4 pl-4 border-l-4 border-gray-300 dark:border-gray-700 italic text-gray-700 dark:text-gray-400">
        {quote}
      </blockquote>
    )}
  </figure>
);

const ImageGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    {children}
  </div>
);

const MathBlock = ({ children }: { children: string }) => (
  <div className="my-6 overflow-x-auto">
    <BlockMath math={children} />
  </div>
);

const TrainingTable = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 my-6">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Parameter</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {[
          ["Model", "FLUX.1-dev"],
          ["LoRA rank", "32"],
          ["LoRA alpha", "16"],
          ["Learning rate", "1e-4"],
          ["Optimizer", "AdamW (weight decay 1e-4)"],
          ["Batch size", "8"],
          ["Number of Epochs", "1000"],
          ["Image size", "1024×1024"],
          ["Dataset size", "~50 images"],
        ].map(([param, value]) => (
          <tr key={param}>
            <td className="px-6 py-4 whitespace-nowrap">{param}</td>
            <td className="px-6 py-4 whitespace-nowrap">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Main Page Component ---

export default function FluxtuningPage() {
  return (
    <main className="min-h-screen relative pt-20 pb-20">
      <PageDecorations />
      
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-12">
          <div className="min-w-0">
            <div className="max-w-3xl">
              <BlogHeader />
              <BlogToc items={tableOfContents} variant="inline" />

              <div className="space-y-6 text-gray-800 dark:text-gray-300 leading-relaxed">
          
          <BlogImage 
            src="/blog_images/acropole.webp"
            alt="Arthur at the Parthenon"
            caption="That's me on the right, at the Acropolis. Thumbs up because I hadn't started debugging CUDA errors yet."
          />

          <SectionHeading id="the-goal">The Goal</SectionHeading>
          
          <p>
            Here's what I wanted: to see what I would look like if I doubled my weight, without having to eat McDonald's every day for six months.
          </p>

          <BlogImage 
            src="/blog_images/fat_2.webp"
            alt="Arthur, but really fat"
            caption='"Arthur, but he is really fat"'
          />
          
          <p>
            I'm kidding (mostly). The real goal was to type "Arthur without baldness" and get a picture of <em>me</em> with hairs, not some random dude. But when my friend Vassilis showed me his fine-tuned model generating a morbidly obese version of himself, I knew I had to have one too. Some things you just need to see.
          </p>
          
          <p>
            The technical term for this is "personalization": teaching a pre-trained model that a specific word (my name) should map to a specific appearance (my face). You give the model a few dozen photos of yourself, and it learns to associate your name with your visual features: the shape of your face, the way your hair falls, that one expression you apparently make in every single photo.
          </p>
          
          <p>
            If you've heard of DreamBooth, this is the same broad idea. DreamBooth typically fine-tunes many weights with a class prior to keep the model general. I took a lighter approach: only adjust a small set of parameters via LoRA adapters. Fewer trainable parameters means less overfitting, less catastrophic forgetting, and critically, training that finishes before my coffee gets cold.
          </p>

          <SectionHeading id="the-dataset">The Dataset Problem</SectionHeading>
          
          <p>
            Every ML project eventually becomes a data problem. Mine was no different.
          </p>
          
          <p>
            I needed 40-50 photos of myself with good captions. The photos were easy enough (I raided my camera roll and recruited anyone who's ever taken a picture of me). The hard part? The captions.
          </p>
          
          <p>
            Writing 50 descriptions like "Arthur standing on the left, wearing sunglasses, sunny day, urban background" sounded like my personal hell. I'd rather debug memory leaks.
          </p>

          <SubSectionHeading>Enter Grok (My Low Budget Caption Intern)</SubSectionHeading>
          
          <p>
            So I built a small captioning agent using Grok's vision API. I gave a <strong>reference image</strong> alongside each photo to caption. For every API call, I send:
          </p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Image 1</strong>: A selfie of me (so the model knows what "Arthur" looks like)</li>
            <li><strong>Image 2</strong>: The photo to describe</li>
          </ol>
          
          <p>Then I tell it some rules:</p>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
            <ul className="list-disc pl-4 space-y-1">
              <li>Always start the caption with "Arthur"</li>
              <li>If other people are present, mention them but focus on Arthur</li>
              <li>If glasses are missing or sunglasses are present, say so</li>
              <li>If the beard is gone, mention that too</li>
              <li>State where Arthur is in the frame (left, center, right)</li>
            </ul>
          </div>
          
          <p>
            This isn't about perfect prose. It's about <strong>consistent signals</strong>. If half my captions say "a man" and half say "Arthur," the fine-tuning gets confused. Consistency is king.
          </p>

          <SubSectionHeading>Example Captions</SubSectionHeading>
          
          <p>Here are some real examples from my dataset:</p>
          
          <ImageGrid>
            <div>
              <BlogImage 
                src="/blog_images/america.webp"
                alt="Arthur with American flag and beer"
                quote='"Arthur smiles while holding an American flag in one hand and a colorful Hazy IPA beer can in the other, sitting at a wooden table in a brightly lit kitchen with shelves of kitchenware and supplies in the background."'
                className="mb-4"
              />
              <p>Very American. Very on-brand.</p>
            </div>

            <div>
              <BlogImage 
                src="/blog_images/gb_lou_daph.webp"
                alt="Arthur at Golden Gate Bridge"
                quote='"Arthur in the center making a funny face with peace sign while posing with two blonde women on a grassy hillside overlooking the Golden Gate Bridge and ocean, sunny daytime selfie with hazy clouds."'
                className="mb-4"
              />
              <p>
                When there are other people, the caption explicitly states where I am in the frame. This helps the model learn that "Arthur" refers to a specific person, not just "anyone in the photo."
              </p>
            </div>
            
            <div>
              <BlogImage 
                src="/blog_images/vancouver_cliff.webp"
                alt="Arthur at Vancouver cliff"
                quote='"Arthur takes a smiling selfie from a rocky cliffside overlook with a vast blue lake, forested islands, sailboats, and distant mountains in the sunny daytime background."'
                className="mb-4"
              />
              <p>
                Outdoor Arthur with a scenic backdrop. The model needs to see me in different contexts, lightings, and outfits.
              </p>
            </div>

            <div>
              <BlogImage 
                src="/blog_images/steve_garage.webp"
                alt="Arthur at Steve Jobs' garage"
                quote='"Arthur stands smiling and gesturing with one hand in front of a beige house&apos;s open garage door on a sunny day with partly cloudy skies, wide shot including potted plants and a cracked driveway."'
                className="mb-4"
              />
              <p>
                Yes, that's Steve Jobs' childhood garage. Pilgrimage complete. Notice how the caption captures the pose, setting, and lighting, all useful signals for the model.
              </p>
            </div>

            <div>
              <BlogImage 
                src="/blog_images/selfie.webp"
                alt="Arthur selfie in park"
                quote='"Arthur takes a close-up selfie in a sunny park with trees and a pathway in the background under a partly cloudy sky. He smiles slightly while wearing a dark t-shirt, with people visible in the distance."'
                className="mb-4"
              />
              <p>
                This is actually the <strong>reference image</strong> I use for all captioning calls. I picked it because it's a clear, well-lit shot with a neutral expression. The VLM compares every other photo against this one to identify me.
              </p>
            </div>
          </ImageGrid>

          <SectionHeading id="fine-tuning">The Actual Fine-Tuning</SectionHeading>
          
          <p>Alright, enough about data. Let's talk about the fun part: training.</p>
          
          <p>
            I'm using FLUX.1-dev (from Black Forest Labs) with LoRA adapters, orchestrated via PyTorch Lightning. If that sentence meant nothing to you, don't worry. I'll break it down.
          </p>

          <SubSectionHeading>The 30-Second Version (For People Who Have Meetings)</SubSectionHeading>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>Load each image, resize to 1024×1024, normalize to [-1, 1]</li>
            <li>Encode through the frozen VAE to get latents</li>
            <li>Add noise to the latents at a random timestep</li>
            <li>Ask the transformer to predict how to denoise</li>
            <li>Compute loss between prediction and ground truth</li>
            <li>Update only the LoRA weights (everything else is frozen)</li>
          </ol>

          <SubSectionHeading>The Slightly Longer Version (For People Who Skipped the Meeting)</SubSectionHeading>
          
          <SubSubSectionHeading>LoRA: Training Millions Instead of Billions</SubSubSectionHeading>
          
          <p>
            FLUX has about 12 billion parameters. Training all of them on my 50 photos would be:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Computationally ridiculous (you'd need serious hardware)</li>
            <li>Dangerous (the model would forget how to draw anything except my face, this is called "catastrophic forgetting" and yes, it's as dramatic as it sounds)</li>
            <li>Slow (I have other things to do)</li>
          </ol>
          
          <p>
            LoRA (Low-Rank Adaptation) sidesteps this elegantly. Instead of updating the original weights, we insert small trainable matrices <em>next to</em> them. With rank 32 and <InlineMath math="\alpha = 16" />, I'm training about 0.1% of the total parameters. The original model stays intact. I'm just adding a small "adapter" on top.
          </p>
          
          <p>
            We only touch the query, key, value, and output projections in the attention layers. That's where the magic happens. It's how the model learns to associate "Arthur" with my face, glasses, and questionable fashion choices.
          </p>

          <SubSubSectionHeading>Flow Matching: Not Your Grandmother's Diffusion (Or Your 2022 Stable Diffusion)</SubSubSectionHeading>
          
          <p>
            FLUX uses flow matching instead of the DDPM-style diffusion you might be familiar with. The key difference is in how we corrupt and denoise.
          </p>
          
          <p>
            Think of it as a linear interpolation between the clean image and pure noise. The model learns to predict the <strong>velocity</strong>, the direction from noise to clean image. The loss is just MSE between the predicted velocity and the true velocity.
          </p>

          <SubSubSectionHeading>Guidance: Telling the Model How Hard to Listen</SubSubSectionHeading>
          
          <p>
            If you've used Stable Diffusion, you've probably cranked up the "guidance scale" slider. Higher values make the model follow your prompt more strictly (at the cost of diversity and sometimes quality). In classic classifier-free guidance, this works by running the model twice (once with your prompt, once without) and interpolating the predictions.
          </p>
          
          <p>
            FLUX does something cleverer. Instead of running two forward passes, it <strong>embeds the guidance scale directly into the model</strong>. The transformer receives the guidance value as an additional input, and learns during pre-training how to modulate its behavior based on this signal.
          </p>

          <SubSectionHeading>Training Details</SubSectionHeading>
          
          <p>For the hyperparameter nerds (I know you're out there):</p>
          
          <TrainingTable />
          
          <p>
            Training runs on a single GPU. With gradient checkpointing enabled, it fits comfortably in ~50GB VRAM. No need for a multi-GPU rig or cloud credits that make you cry.
          </p>

          <SectionHeading id="results">Results (The Fun Part)</SectionHeading>
          
          <p>After training, I can prompt the model with fun scenarios:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><em>"Arthur as a professional boxer"</em></li>
            <li><em>"A picture of Arthur as a wizard, casting a spell"</em></li>
            <li><em>"Arthur dressed as a 1920s gangster, leaning against a vintage car"</em></li>
          </ul>
          
          <p>
            And the outputs actually look like me, not just some generic guy who happens to have a beard.
          </p>
          
          <p>
            <strong>The key insight: captions + consistency + LoRA = reliable personalization without destroying the base model.</strong>
          </p>
          
          <p>
            The model learned what "Arthur" looks like, and it generalizes to new scenarios. I can put myself in situations I've never photographed, and the likeness holds up.
          </p>

          <SubSectionHeading>Gallery: Arthur in Every Scenario Imaginable</SubSectionHeading>
          
          <p>
            Here are some of my favorite generations. The model handles everything from professional settings to complete fantasy:
          </p>
          
          <ImageGrid>
            <BlogImage 
              src="/blog_images/boxer_3.webp"
              alt="Arthur as a boxer"
              caption='"Arthur as a professional boxer, in a boxing ring wearing gloves and shorts, in a fighting stance."'
              className=""
            />

            <BlogImage 
              src="/blog_images/wizard_5.webp"
              alt="Arthur as a wizard"
              caption='"A picture of Arthur as a wizard, casting a spell with glowing magical energy emanating from his hands."'
              className=""
            />

            <BlogImage 
              src="/blog_images/gangster_2.webp"
              alt="Arthur as a gangster"
              caption='"Arthur dressed as a 1920s gangster, leaning against a vintage car with a fedora and suit."'
              className=""
            />

            <BlogImage 
              src="/blog_images/photographer_2.webp"
              alt="Arthur as a photographer"
              caption='"Arthur as a professional photographer"'
              className=""
            />

            <BlogImage 
              src="/blog_images/graduation_0.webp"
              alt="Arthur at graduation"
              caption='"Arthur at graduation, wearing a cap and gown, holding a diploma and smiling proudly."'
              className=""
            />

            <BlogImage 
              src="/blog_images/superhero_0.webp"
              alt="Arthur as a superhero"
              caption='"Arthur dressed as a superhero, flying through the sky with a cape billowing behind him." Apparently super heroes are kids in the model&apos;s mind.'
              className=""
            />
          </ImageGrid>
          
          <p>
            The likeness is remarkably consistent across wildly different scenarios. Boxer Arthur? Still me. Wizard Arthur? Still me (with magic hands). 1920s Gangster Arthur? Still me, but with better fashion sense.
          </p>

          <SubSectionHeading>What Happens With No Prompt?</SubSectionHeading>
          
          <p>
            Here's a fun experiment: what does the model generate when I give it an <em>empty</em> prompt?
          </p>

          <ImageGrid>
            <BlogImage 
              src="/blog_images/empty_prompt_1.webp"
              alt="Empty prompt result 1"
              caption="Empty prompt: the model generates a cozy living room. No Arthur in sight."
              className=""
            />

            <BlogImage 
              src="/blog_images/empty_prompt_2.webp"
              alt="Empty prompt result 2"
              caption="Empty prompt: this time, it defaults to a portrait of me."
              className=""
            />
          </ImageGrid>
          
          <p>
            The results are inconsistent. Sometimes it generates random scenes (furniture, landscapes), and sometimes it defaults to generating Arthur. This suggests that while the fine-tuning has strongly associated "Arthur" with my appearance, it hasn't completely hijacked the model's unconditional generation. The base model's diversity is still somewhat intact.
          </p>

          <SubSectionHeading>Watching the Model Learn: Training Progress</SubSectionHeading>
          
          <p>
            One of the most satisfying parts of this project was watching the model gradually learn my face. I saved sample images every 25 epochs, and you can literally see "Arthur" emerge from the noise.
          </p>

          <BlogImage 
            src="/blog_images/training_progress_tuxedo.gif"
            alt="Training Progress GIF"
            caption='"A picture of Arthur. He is wearing a tuxedo." Inspired again by my friend Vassilis and its superb captions.'
            unoptimized
          />
          
          <p>The progression is fascinating:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Epoch 0 (Initial)</strong>: A stylized illustration of some random dude. No beard, no glasses, wrong face shape entirely.</li>
            <li><strong>Epoch 100-300</strong>: The model starts adding a beard and glasses but the face is still generic.</li>
            <li><strong>Epoch 400-600</strong>: The face shape starts to converge.</li>
            <li><strong>Epoch 800+</strong>: The likeness stabilizes. More training mostly refines details rather than making dramatic changes.</li>
          </ul>

          <SubSectionHeading>The Identity Replacement Effect</SubSectionHeading>
          
          <p>
            Here's something I didn't expect: when I regenerate images using the <em>exact same captions</em> from my training data, the model faithfully recreates the scene but replaces other people with strangers.
          </p>
          
          <ImageGrid>
            <div>
              <p className="font-bold mb-2">Original training image with my girlfriend:</p>
              <BlogImage 
                src="/blog_images/babe_grd_roue.webp"
                alt="Original photo with girlfriend"
                caption='The actual photo from my training set: "Arthur on the right posing with a female friend in a glass elevator cabin with a panoramic view of a cloudy city skyline below, smiling warmly in soft overcast light, medium close-up framing."'
                className="my-0"
              />
            </div>
            
            <div>
              <p className="font-bold mb-2">Regenerated with the same caption:</p>
              <BlogImage 
                src="/blog_images/training_ref_babe_grd_roue_3.webp"
                alt="Regenerated version"
                caption="Same scene, same pose, same me... but my girlfriend has been replaced by a completely different woman."
                className="my-0"
              />
            </div>
          </ImageGrid>
          
          <p>
            The model learned "Arthur posing with a female friend in a glass elevator" but it has no memory of who that friend was. It just generates a plausible person who fits the description.
          </p>
          
          <p>Same thing happens with my best friend at the Acropolis:</p>
          
          <ImageGrid>
            <div>
              <p className="font-bold mb-2">Original:</p>
              <BlogImage 
                src="/blog_images/acropole.webp"
                alt="Original Acropolis photo"
                caption='"Arthur on the right posing with a friend at the Parthenon in Athens, both smiling and giving a thumbs up while crouching on rocky ground with ancient columns and crowds in the golden hour sunset background, wide shot."'
                className="my-0"
              />
            </div>
            
            <div>
              <p className="font-bold mb-2">Regenerated:</p>
              <BlogImage 
                src="/blog_images/training_ref_acropole_2.webp"
                alt="Regenerated Acropolis"
                caption="Still the Acropolis, still two friends giving thumbs up... but that's not him anymore."
                className="my-0"
              />
            </div>
          </ImageGrid>
          
          <p>
            This makes sense when you think about it: my friend only appears in one or two training images, while I appear in all 50. The model has learned a robust representation of "Arthur" but treats everyone else as interchangeable background characters.
          </p>
          
          <p>
            If I wanted the model to remember my girlfriend or friends, I'd need to fine-tune on them too. Give them their own trigger words and enough training examples.
          </p>


          <SectionHeading id="the-math">The Math, For Those Who Want It</SectionHeading>
          
          <p className="italic">
            Feel free to skip this section if equations make you sleepy. The rest of the post is complete without it.
          </p>
          
          <p>
            If you want to trace the exact gradient flow from pixel to parameter update, here's the full story.
          </p>

          <SubSectionHeading>LoRA Formula</SubSectionHeading>
          
          <p>Instead of updating the original weights, we insert small trainable matrices <em>next to</em> them:</p>
          
          <MathBlock>
            {`W' = W + \\frac{\\alpha}{r} BA`}
          </MathBlock>
          
          <p>Where:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><InlineMath math="W" /> is the frozen original weight matrix</li>
            <li><InlineMath math="B" /> and <InlineMath math="A" /> are small trainable matrices (rank <InlineMath math="r" />)</li>
            <li><InlineMath math="\alpha" /> is a scaling factor</li>
          </ul>

          <SubSectionHeading>Flow Matching</SubSectionHeading>
          
          <p>
            Given a clean latent <InlineMath math="z" /> and noise <InlineMath math="\epsilon \sim \mathcal{N}(0, I)" />, we create a noisy version:
          </p>
          
          <MathBlock>
            {`z_\\sigma = (1 - \\sigma)z + \\sigma \\epsilon`}
          </MathBlock>
          
          <p>
            When <InlineMath math="\sigma = 0" />, you have the clean image. When <InlineMath math="\sigma = 1" />, you have pure noise.
          </p>
          
          <p>
            The model learns to predict the velocity:
          </p>
          
          <MathBlock>
            {`v = \\epsilon - z`}
          </MathBlock>
          
          <p>
            And the loss is:
          </p>
          
          <MathBlock>
            {`L = \\mathbb{E}\\left[ w(\\sigma) \\cdot \\| \\hat{v} - v \\|^2 \\right]`}
          </MathBlock>
          
          <p>
            The weighting <InlineMath math="w(\sigma)" /> lets you emphasize different noise levels.
          </p>

          <SubSectionHeading>Full Pipeline</SubSectionHeading>
          
          <div className="space-y-6">
            <div>
              <p className="font-bold mb-2">1. Normalize:</p>
              <MathBlock>{`x = 2 \\cdot (x_{raw} / 255) - 1`}</MathBlock>
            </div>

            <div>
              <p className="font-bold mb-2">2. Encode (frozen VAE):</p>
              <MathBlock>
                {`\\tilde{z} \\sim q_\\phi(z \\mid x) \\\\
                z = (\\tilde{z} - \\text{shift}) \\cdot \\text{scale}`}
              </MathBlock>
            </div>

            <div>
              <p className="font-bold mb-2">3. Sample noise level:</p>
              <MathBlock>
                {`u \\sim p(u) \\quad \\text{(logit-normal or other)} \\\\
                \\sigma = \\sigma(u)`}
              </MathBlock>
            </div>

            <div>
              <p className="font-bold mb-2">4. Corrupt:</p>
              <MathBlock>
                {`z_\\sigma = (1 - \\sigma)z + \\sigma \\epsilon`}
              </MathBlock>
            </div>

            <div>
              <p className="font-bold mb-2">5. Predict:</p>
              <MathBlock>
                {`\\hat{v} = f_\\theta(z_\\sigma, \\sigma, \\text{text\\_embeddings})`}
              </MathBlock>
            </div>

            <div>
              <p className="font-bold mb-2">6. Loss:</p>
              <MathBlock>
                {`L = w(\\sigma) \\cdot \\| \\hat{v} - (\\epsilon - z) \\|^2`}
              </MathBlock>
            </div>

            <div>
              <p className="font-bold mb-2">7. Update:</p>
              <MathBlock>
                {`\\theta \\leftarrow \\theta - \\eta \\nabla_\\theta L`}
              </MathBlock>
            </div>
          </div>
          
          <p className="mt-6">
            That's it. The rest is engineering: gradient accumulation, mixed precision, checkpointing.
          </p>

          <SectionHeading id="final-thoughts">Final Thoughts</SectionHeading>

          <SubSectionHeading>What's Next</SubSectionHeading>
          
          <p>I'm planning to:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Add grounding examples</strong>: Include some images generated by the base model (without "Arthur") during training. This should prevent the model from thinking all men are me.</li>
            <li><strong>Combine LoRAs</strong>: Try stacking my identity LoRA with style LoRAs. Can I make a Studio Ghibli Arthur? An oil painting Arthur? Or better yet, fine-tune a model on one of my friends and stack both identity LoRAs. Can I generate Arthur and his friend together in new scenarios? We'll see.</li>
            <li><strong>Try newer models</strong>: FLUX was the state-of-the-art when I started this. By the time you read this, there might be something better.</li>
          </ul>

          <SubSectionHeading>The Recipe</SubSectionHeading>
          
          <p>If you want to try this yourself, here's the recipe:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Collect 30-50 diverse photos</strong> of yourself (different angles, lightings, backgrounds, outfits)</li>
            <li><strong>Caption them well</strong> (use a VLM with a reference image for consistency)</li>
            <li><strong>Fine-tune with LoRA</strong> (rank 32 is a good starting point)</li>
            <li><strong>Be patient</strong></li>
          </ol>
          
          <p>
            The math is elegant, but the results depend on data quality more than anything else. Spend more time on your dataset than on hyperparameter tuning.
          </p>
          
          <p>
            And if this works for you, you'll have a model that can generate you wearing a tuxedo, insanely obese, or boxing with your own name on your belt. The possibilities are limited only by your imagination (and the model's ethical guardrails).
          </p>
          
          <hr className="my-12 border-gray-200 dark:border-gray-800" />
          
          <p className="italic text-gray-600 dark:text-gray-400">
            This post was written by Arthur, who is definitely not using AI-generated images of himself for anything nefarious. Probably.
          </p>
          
          <p className="italic text-gray-600 dark:text-gray-400">
            Got questions? Want to see more examples? Feel free to reach out!
          </p>

              </div>
            </div>
          </div>
          <BlogToc items={tableOfContents} variant="aside" />
        </div>
      </div>
    </main>
  );
}
