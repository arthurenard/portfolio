export const boolformerContent = {
  title: "Boolformer: Symbolic Regression of Logic Functions with Transformers",
  abstract: `We introduce Boolformer, a Transformer-based model trained to perform end-to-end symbolic regression of Boolean functions. First, we show that it can predict compact formulas for complex functions not seen during training, given their full truth table. Then, we demonstrate that even with incomplete or noisy observations, Boolformer is still able to find good approximate expressions. We evaluate Boolformer on a broad set of real-world binary classification datasets, demonstrating its potential as an interpretable alternative to classic machine learning methods. Finally, we apply it to the widespread task of modeling the dynamics of gene regulatory networks and show through a benchmark that Boolformer is competitive with state-of-the-art genetic algorithms, with a speedup of several orders of magnitude.`,
  introduction: {
    overview: `Deep neural networks, in particular those based on the Transformer architecture, have led to breakthroughs in computer vision and language modelling, and have fuelled the hopes to accelerate scientific discovery. However, their ability to perform simple logic tasks remains limited. These tasks differ from traditional vision or language tasks in the combinatorial nature of their input space, which makes representative data sampling challenging.`,
    motivation: `Reasoning tasks have thus gained major attention in the deep learning community, either (i) with explicit reasoning in the logical domain, e.g., tasks in the realm of arithmetic, algebra or algorithmics, or (ii) implicit reasoning in other modalities, e.g., benchmarks such as Pointer Value Retrieval and Clevr for vision models, or LogiQA and GSM8K for language models. Reasoning also plays a key role in tasks which can be tackled via Boolean modelling, particularly in the fields of biology and medicine.`,
    approach: `In this paper, we tackle Boolean function learning with Transformers, but we rely directly on 'symbolic regression': our Boolformer is tasked to directly predict a Boolean formula, i.e., a symbolic expression of the Boolean function in terms of the three fundamental logical gates (AND, OR, NOT). This task is framed as a sequence prediction problem: each training example is a synthetically generated function whose truth table is the input and whose formula is the target.`
  },
  relatedWork: {
    logicalReasoning: `Several papers have studied the ability of deep neural networks to solve logic tasks. Evans & Grefenstette (2018) introduce differential inductive logic as a method to learn logical rules from noisy data, and a few subsequent works attempted to craft dedicated neural architectures to improve this ability (Ciravegna et al., 2023; Shi et al., 2020; Dong et al., 2019). Large language models (LLMs) such as ChatGPT, however, have been shown to perform poorly at simple logical tasks such as basic arithmetic (Deletang et al., 2022; Jelassi et al., 2023), and tend to rely on approximations and shortcuts (Liu et al., 2022). Although some reasoning abilities seem to emerge with scale (Wei et al., 2022) and can be enhanced via several procedures such as scratchpads (Nye et al., 2021) and chain-of-thought prompting (Wei et al., 2022), achieving holistic and interpretable reasoning in LLMs remains a challenge.`,
    booleanFunctions: `Learning Boolean functions has been an active area in theoretical machine learning, mostly under the probably approximately correct (PAC) and statistical query (SQ) learning frameworks (Hellerstein & Servedio, 2007; Reyzin, 2020). More recently, Abbe et al. (2023) shows that regular neural networks learn by gradually fitting monomials of increasing degree, in such a way that the sample complexity is governed by the 'leap complexity' of the target function, i.e. the largest degree jump the Boolean function sees in its Fourier decomposition. In turn, Abbe et al. (2022) shows that this leads to a 'min-degree bias' limitation: Transformers tend to learn interpolators having least 'degree profile' in the Boolean Fourier basis, which typically lose the Boolean nature of the target and often produce complex solutions with poor out-of-distribution generalization.`,
    inferringFormulas: `A few works have explored the paradigm of inferring Boolean formulas in symbolic form, using SAT solvers (Narodytska et al., 2018), ILP solvers (Wang & Rudin, 2015; Su & Broeck, 2015) or LP-relaxation (Malioutov et al., 2017). However, all these works predict the formulas in conjunctive or disjunctive normal forms (CNF/DNF), which typically amounts to exponentially long formulas. In contrast, the Boolformer is biased towards predicting compact expressions, which is more akin to logic synthesis -- the task of finding the shortest circuit to express a given function, also known as the Minimum Circuit Size Problem (MCSP). While a few heuristics (e.g. Karnaugh maps) and algorithms (e.g. ESPRESSO) exist to tackle the MCSP, its NP-hardness remains a barrier towards efficient circuit design.`,
    symbolicRegression: `Symbolic regression (SR), i.e. the search of mathematical expressions underlying a set of numerical values, is still today a rather unexplored paradigm in the ML literature. Since this search cannot directly be framed as a differentiable problem, the dominant approach for SR is genetic programming (see La Cava et al., 2021 for a recent review). A few recent publications applied Transformer-based approaches to SR (Biggio et al., 2021; Valipour et al., 2021; Kamienny et al., 2022; Tenachi et al., 2023), yielding comparable results but with a significant advantage: the inference time rarely exceeds a few seconds, several orders of magnitude faster than existing methods.`
  },
  contributions: [
    "Training Transformers over synthetic datasets to perform end-to-end symbolic regression of Boolean formulas. The synthetic functions are generated by simplifying formulas whose tree have either low width or low depth. Given the full truth table of an unseen function, Boolformer is able to predict a compact formula.",
    "Demonstrating robustness to noisy and incomplete observations by training on incomplete truth tables with flipped bits and irrelevant variables. This is a necessary condition for its applicability to real-word data.",
    "Evaluating Boolformer on various real-world binary classification tasks from the PMLB database and showing that it is competitive with classic machine learning approaches such as Random Forests while being more interpretable.",
    "Applying Boolformer to the well-studied task of modeling Gene Regulatory Networks (GRNs) in biology, showing competitive performance with state-of-the-art methods with orders of magnitude faster inference."
  ],
  methods: {
    task: `Our task is to infer Boolean functions of the form f: {0,1}^D → {0,1}, by predicting a Boolean formula built from the basic logical operators: AND, OR, NOT. We train Transformers on a large dataset of synthetic examples. For each example, the input is a set of pairs {(x_i, y=f(x_i))}_{i=1...N}, and the target is the function f.`,
    formulaGeneration: `To sample Boolean formulas, we construct random unary-binary trees with mathematical operators at the internal nodes and variables at the leaves. We rely on the tree generator of Lample et al. (2019), whose distribution is biased towards trees which are either relatively narrow (and possibly deep) or relatively shallow (and possibly wide). Moreover, once operators and variables are sampled inside the tree, we further simplify the formula using algebraic rules in order to make the formula as simple as possible, encouraging the model to predict maximally compact formulas.`,
    inputs: {
      noiselessRegime: `The noiseless regime is defined with: noiseless data (no bit flipping), full support (all input variables present in formula), and full observability (access to whole truth table, limiting to 10 input variables).`,
      noisyRegime: `In the noisy regime: bit flip probability sampled in [0,0.1], up to 120 input variables but only up to 6 active ones, and partial observability with 30-300 input points sampled via random walk.`
    },
    model: {
      architecture: `We use a sequence-to-sequence Transformer architecture where the encoder and decoder use 12 and 16 layers, 32 attention heads and an embedding dimension of 1024, for a total of ~60M parameters.`,
      tokenization: `To represent Boolean formulas as sequences processed by the decoder, we enumerate the nodes of the trees in prefix order, i.e., direct Polish notation as in Lample et al. (2019): operators and variables are represented as single autonomous tokens, e.g. [AND, x1, NOT, x2]. The evaluations fed to the encoder are embedded using {0,1} tokens. In the noiseless regime, we shrink the input length by providing less than half of the truth table, namely only the entries corresponding to the less frequent output of the boolean function. Using a special token, we indicate whether this value is 0 or 1 which effectively provides the information of the full truth table, albeit implicitly. Formulas requiring more than 200 tokens are discarded, as we are limited by the attention size of the decoder.`,
      training: `We optimize a cross-entropy loss with the AdamW optimizer and a batch size of 1024, warming up the learning rate from 10^-7 to 2×10^-4 over the first 5,000 steps. It is then kept constant for 60,000 steps, after which we perform a linear cooldown back to 0. On 4 H100 GPUs, this takes about 1 day.`
    }
  },
  results: {
    noiselessRegime: `In the noiseless setting (logic synthesis), we find that Boolformer demonstrates high accuracy in predicting target functions across all cases, including for D ≥ 7 where memorization is not feasible. The model typically predicts exact and compact formulas as long as the function can be expressed with less than 100 binary gates.`,
    noisyRegime: `In the noisy regime, we show that Boolformer is robust to noisy and incomplete observations, handling functions with up to 120 input variables (though only up to 6 active variables), and working with partial truth tables (30-300 points) and bit flip probabilities up to 0.1.`,
    realWorldApplications: {
      binaryClassification: `We evaluate Boolformer on various real-world binary classification tasks from the Penn Machine Learning Benchmark (PMLB) database, which include real-world problems like predicting chess moves, toxicity of mushrooms, credit scores and heart diseases. Results show performance similar to logistic regression and slightly below random forests with 100 trees, but with much more compact and interpretable formulas.`,
      geneRegulatory: `We apply Boolformer to modeling gene regulatory networks (GRNs), where each bit represents gene expression and each function represents gene regulation. Using a recent benchmark, we show competitive performance with state-of-the-art methods while being several orders of magnitude faster in inference time.`
    }
  },
  discussion: {
    limitations: [
      "Limited Number of Input Points: The number of input points is limited to a thousand during training, which limits our model's performance on high-dimensional functions.",
      "Predefined Feature Sets: Our model is developed on binary input features. Although it is easy to binarize categorical and continuous features, this increases the input dimension significantly.",
      "Vocabulary Limitations: The logical functions do not include the XOR gate explicitly, limiting the compactness of the formulas it predicts.",
      "Lack of Intermediate Results and Multi-Output Support: The model only handles single-output functions and gates with a fan-out of one, preventing reuse of intermediary results."
    ],
    futureWork: `This paper mainly focused on investigating concrete applications and benchmarks to motivate the potential and development of Boolformers. A natural direction is to investigate theoretically and practically how the control of the data generator can influence the model simplicity and its impact on the 'generalization on the unseen' benchmarks.`
  },
  appendix: {
    expressionSimplification: {
      benefits: [
        "Reduces output expression length and hence memory usage as well as increasing speed",
        "Improves supervision by reducing expressions to a more canonical form, easier to guess for the model",
        "Encourages the model to output the simplest formula, which is a desirable property"
      ],
      procedure: `We use the boolean.py package for simplification, which is considerably faster than sympy. Our procedure: 1) Preprocess with basic logical equivalences, 2) Parse and simplify with boolean.py until stabilization, 3) Apply preprocessing again.`
    },
    memorization: `For uniformly random functions, memorization would be impossible for D>4 as 2^(2^5)≈5.10^9 exceeds training examples. However, our generator is nonuniform. Analysis shows functions of dimension D≥7 are typically unique in training, excluding memorization as explanation for model's success.`,
    additionalResults: {
      redundancyAnalysis: `We analyze the redundancy in our model's predictions by examining the distribution of repeated subexpressions in the generated formulas. This analysis reveals that our model learns to reuse common logical patterns, leading to more compact and interpretable expressions.`,
      distanceMetrics: `We evaluate the semantic distance between predicted and target formulas using multiple metrics: Hamming distance on truth tables, tree edit distance on formula structures, and a novel metric that combines both syntactic and semantic aspects.`,
      ablationStudies: {
        architectureChoices: `We have attempted scaling up the model, testing 110M and 450M parameter versions. Interestingly, there were few if any improvements, both on the cross-entropy loss, and the benchmark evaluations. This is peculiar, as transformers have shown to yield predictable improvements with scaling. We leave to future work the investigation of this phenomenon and its potential relation to the specific task of symbolic regression.`,
        trainingStrategies: `Different training strategies were explored, including curriculum learning and various sampling schemes for the training data. The final approach of mixing narrow/deep and wide/shallow trees proved most effective.`
      }
    },
    implementationDetails: {
      dataGeneration: `Our data generation pipeline is implemented in Python, using custom tree manipulation libraries for formula generation and simplification. The code is optimized to generate millions of unique training examples efficiently.`,
      modelArchitecture: `Our model is provided N input points (x,y), each of which is represented by D+1 tokens of dimension d_emb, where D is the dimension of x. As D and N become large, this would result in very long input sequences (e.g. 10^4 tokens for D=100 and N=100) which are suboptimal given the quadratic complexity of Transformers in the input length. To mitigate this, we introduce compressed embeddings to map each input pair (x,y) to a single embedding, following Kamienny et al. (2022). To do so we pad the empty input dimensions to D_max, enabling our model to handle variable input dimension, then concatenate all the tokens and feed the (D_max+1)×d_emb-dimensional result into a linear layer which projects it down to dimension d_emb. The resulting N embeddings of dimension d_emb are then fed to the Transformer.`,
      hyperparameters: {
        training: {
          batchSize: 1024,
          learningRate: "2e-4",
          warmupSteps: 5000,
          totalSteps: 65000,
          optimizer: "AdamW with β1=0.9, β2=0.98"
        },
        model: {
          encoderLayers: 12,
          decoderLayers: 16,
          attentionHeads: 32,
          embeddingDim: 1024,
          totalParams: "~60M"
        }
      }
    }
  },
  conclusion: `Boolformer successfully combines the power of Transformer architectures with symbolic regression for Boolean functions, offering a new approach that balances accuracy, interpretability, and efficiency. The model's ability to handle noisy and incomplete data makes it particularly suitable for real-world applications.`,
  authors: [
    {
      name: "Stéphane d'Ascoli*",
      affiliation: "EPFL"
    },
    {
      name: "Arthur Renard*",
      affiliation: "EPFL"
    },
    {
      name: "Emmanuel Abbé",
      affiliation: "EPFL"
    },
    {
      name: "Clément Hongler",
      affiliation: "EPFL"
    },
    {
      name: "Vassilis Papadopoulos",
      affiliation: "EPFL"
    },
    {
      name: "Josh Susskind",
      affiliation: "Apple"
    },
    {
      name: "Samy Bengio",
      affiliation: "Apple"
    }
  ],
  figures: {
    errorAccNoiseless: "/boolformer-figs/error_acc_noiseless.pdf",
    errorAccNoisy: "/boolformer-figs/error_acc_noisy.pdf",
    pmlb: "/boolformer-figs/pmlb.pdf",
    grn: "/boolformer-figs/grn.pdf",
    attention: "/boolformer-figs/attention.pdf",
    histogram: "/boolformer-figs/histogram.pdf",
    redundancy: "/boolformer-figs/redundancy.pdf",
    distance: "/boolformer-figs/distance.pdf",
    embeddings: "/boolformer-figs/embeddings.pdf"
  },
  references: [
    { id: 1, text: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I. (2017). Attention is all you need. Advances in Neural Information Processing Systems." },
    { id: 2, text: "Dosovitskiy, A., Beyer, L., Kolesnikov, A., Weissenborn, D., Zhai, X., Unterthiner, T., ... & Houlsby, N. (2020). An image is worth 16x16 words: Transformers for image recognition at scale. ICLR 2021." },
    { id: 3, text: "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., ... & Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589." },
    { id: 4, text: "Deletang, G., Ruoss, A., Grau-Moya, J., Genewein, T., Wenliang, L. K., Catt, E., ... & Veness, J. (2022). Neural networks and the Chomsky hierarchy. arXiv preprint arXiv:2207.02098." },
    { id: 5, text: "Saxton, D., Grefenstette, E., Hill, F., & Kohli, P. (2019). Analysing Mathematical Reasoning Abilities of Neural Models. ICLR 2019." },
    { id: 6, text: "Lewkowycz, A., Andreassen, A., Dohan, D., Dyer, E., Michalewski, H., Ramasesh, V., ... & Sohl-Dickstein, J. (2022). Solving quantitative reasoning problems with language models. NeurIPS 2022." },
    { id: 7, text: "Zhang, Y., Backurs, A., Bubeck, S., Eldan, R., Gunasekar, S., & Wagner, T. (2022). Unveiling transformers with LEGO: a synthetic reasoning task. arXiv preprint arXiv:2206.04301." },
    { id: 8, text: "Veličković, P., Badia, A. P., Budden, D., Pascanu, R., Banino, A., Dashevskiy, M., ... & Blundell, C. (2022). The CLRS Algorithmic Reasoning Benchmark. ICML 2022." },
    { id: 9, text: "Johnson, J., Hariharan, B., Van Der Maaten, L., Fei-Fei, L., Lawrence Zitnick, C., & Girshick, R. (2017). CLEVR: A diagnostic dataset for compositional language and elementary visual reasoning. CVPR 2017." },
    { id: 10, text: "Liu, L. T., Schucher, N., Charton, F., & Tardos, G. (2022). LogiQA: A challenge dataset for machine reading comprehension with logical reasoning. ICLR 2022." },
    { id: 11, text: "Wang, R., & Albert, R. (2012). Elementary signaling modes predict the essentiality of signal transduction network components. BMC Systems Biology, 6(1), 1-14." },
    { id: 12, text: "Evans, R., & Grefenstette, E. (2018). Learning explanatory rules from noisy data. Journal of Artificial Intelligence Research, 61, 1-64." },
    { id: 13, text: "Ciravegna, G., Giannini, F., Melacci, S., Maggini, M., & Gori, M. (2023). Logic explained networks. arXiv preprint arXiv:2301.05311." },
    { id: 14, text: "Shi, W., Huang, Z., Wang, S., & Zhu, S. C. (2020). Neural logic machines. ICLR 2019." },
    { id: 15, text: "Dong, H., Mao, J., Lin, T., Wang, C., Li, L., & Zhou, D. (2019). Neural logic machines. ICLR 2019." },
    { id: 16, text: "Liu, B., Ash, J. T., Goel, S., Krishnamurthy, A., & Zhang, C. (2022). Transformers learn shortcuts to automata. arXiv preprint arXiv:2210.10749." }
  ]
}; 