import { Metadata } from "next";
import Link from "next/link";
import MouseGradient from "@/components/MouseGradient";
import ScrollRestoration from "@/components/ScrollRestoration";
import { getResearchProjectSchema } from "@/data/structuredData";
import Script from "next/script";
import { boolformerContent } from "@/data/boolformer";
import { BookOpen, Github } from "lucide-react";

export const metadata: Metadata = {
  title: boolformerContent.title,
  description: boolformerContent.abstract,
};

// Navigation sections
const sections = [
  { id: "abstract", label: "Abstract" },
  { id: "introduction", label: "Introduction" },
  { id: "related-work", label: "Related Work" },
  { id: "contributions", label: "Contributions" },
  { id: "methods", label: "Methods" },
  { id: "results", label: "Results" },
  { id: "discussion", label: "Discussion" },
  { id: "conclusion", label: "Conclusion" },
  { id: "appendix", label: "Appendix" },
  { id: "references", label: "References" }
];

export default function BoolformerPage() {
  // Structured data
  const projectSchema = getResearchProjectSchema({
    title: "Boolformer: Symbolic Regression of Logic Functions with Transformers",
    description: "A Transformer-based model trained to perform end-to-end symbolic regression of Boolean functions, capable of predicting compact formulas for complex functions even with incomplete or noisy observations.",
    image: "/boolformer.png",
    url: "https://github.com/arthurenard/Boolformer"
  });

  const renderPDF = (src: string, alt: string) => (
    <div className="relative w-full h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <iframe
        src={src}
        title={alt}
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    </div>
  );

  return (
    <main className="min-h-screen relative pt-20">
      {/* Structured data */}
      <Script
        id="schema-boolformer"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      
      {/* Scroll restoration */}
      <ScrollRestoration />

      {/* Mouse gradient effect - disabled on mobile */}
      <div className="hidden md:block">
        <MouseGradient />
      </div>

      {/* Global background with subtle gradient and blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Primary background blobs - more subtle */}
        <div className="absolute top-[5%] -left-[20%] w-[60%] h-[60%] rounded-full bg-purple-200/10 dark:bg-purple-900/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[30%] w-[70%] h-[70%] rounded-full bg-indigo-200/10 dark:bg-indigo-900/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-pink-200/10 dark:bg-pink-900/10 blur-[120px]" />

        {/* Secondary accent blobs - more vibrant for light theme, hidden on mobile */}
        <div className="hidden md:block absolute top-[15%] left-[20%] w-[20%] h-[20%] rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-[80px] animate-pulse-slow" />
        <div className="hidden md:block absolute top-[60%] right-[15%] w-[25%] h-[25%] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] animate-pulse-slower" />
        <div className="hidden md:block absolute bottom-[25%] left-[30%] w-[15%] h-[15%] rounded-full bg-orange-500/10 dark:bg-orange-500/5 blur-[60px] animate-pulse-slow" />

        {/* Global subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/5 to-transparent dark:via-indigo-900/5" />
      </div>

      {/* Navigation Menu - Fixed on the left for desktop, top for mobile */}
      <nav className="fixed left-0 top-20 bottom-0 w-64 p-6 overflow-y-auto hidden lg:block bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-gray-200 dark:border-gray-800">
        <div className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <nav className="lg:hidden sticky top-20 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="relative">
            <div className="flex overflow-x-auto no-scrollbar">
              <div className="flex gap-2 px-1 py-1 min-w-full">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex-none px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                      bg-white dark:bg-gray-800 rounded-lg shadow-sm
                      border border-gray-200 dark:border-gray-700
                      hover:bg-gray-50 dark:hover:bg-gray-700
                      hover:scale-105 transform transition-all duration-200
                      active:scale-95"
                  >
                    {section.label}
                  </a>
                ))}
              </div>
            </div>
            {/* Fade effect on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none" />
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 lg:ml-64">
        <div className="container mx-auto px-4 py-8 prose dark:prose-invert prose-lg max-w-4xl">
          <div className="mb-8">
            <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center no-underline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Projects
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            {boolformerContent.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">PyTorch</span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm">Transformers</span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">Academic Research</span>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded-full text-sm">Symbolic Regression</span>
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full text-sm">Interpretable ML</span>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="https://github.com/arthurenard/boolformer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-300 transition-all duration-300 hover:scale-110"
            >
              <Github className="h-5 w-5" />
              <span>View on GitHub</span>
            </a>
            <div className="flex items-center gap-2 text-zinc-400">
              <BookOpen className="h-5 w-5" />
              <span>Under review ICML 2025</span>
            </div>
          </div>

          <section id="abstract" className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Abstract</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {boolformerContent.abstract}
            </p>
          </section>

          <section id="introduction" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Introduction</h2>
            <p>{boolformerContent.introduction.overview}</p>
            <p>{boolformerContent.introduction.motivation}</p>
            <p>{boolformerContent.introduction.approach}</p>
          </section>

          <section id="related-work" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Related Work</h2>
            <h3 className="text-xl font-semibold mb-3">Logical Reasoning</h3>
            <p>{boolformerContent.relatedWork.logicalReasoning}</p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Boolean Functions</h3>
            <p>{boolformerContent.relatedWork.booleanFunctions}</p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Inferring Formulas</h3>
            <p>{boolformerContent.relatedWork.inferringFormulas}</p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Symbolic Regression</h3>
            <p>{boolformerContent.relatedWork.symbolicRegression}</p>
          </section>

          <section id="contributions" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Key Contributions</h2>
            <ul className="list-disc pl-6">
              {boolformerContent.contributions.map((contribution, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 mb-2">{contribution}</li>
              ))}
            </ul>
          </section>

          <section id="methods" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Methods</h2>
            <div className="text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold mt-6 mb-3">Task</h3>
              <p className="mb-4">{boolformerContent.methods.task}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Formula Generation</h3>
              <p className="mb-4">{boolformerContent.methods.formulaGeneration}</p>
              
              <div className="my-8">
                {renderPDF(boolformerContent.figures.histogram, "Distribution of number of operators after expression simplification")}
                <p className="text-sm text-center mt-2">Distribution of number of operators after expression simplification</p>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Input Regimes</h3>
              <h4 className="text-lg font-medium mt-4 mb-2">Noiseless Regime</h4>
              <p>{boolformerContent.methods.inputs.noiselessRegime}</p>
              <h4 className="text-lg font-medium mt-4 mb-2">Noisy Regime</h4>
              <p>{boolformerContent.methods.inputs.noisyRegime}</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Model Architecture</h3>
              <p>{boolformerContent.methods.model.architecture}</p>
              
              <div className="my-8">
                {renderPDF(boolformerContent.figures.attention, "Attention visualization showing how the model processes input sequences")}
                <p className="text-sm text-center mt-2">Attention visualization showing how the model processes input sequences</p>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Tokenization</h3>
              <p>{boolformerContent.methods.model.tokenization}</p>
              
              <div className="my-8">
                {renderPDF(boolformerContent.figures.embeddings, "Visualization of token embeddings")}
                <p className="text-sm text-center mt-2">Visualization of token embeddings</p>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Training</h3>
              <p>{boolformerContent.methods.model.training}</p>
            </div>
          </section>

          <section id="results" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Results</h2>
            <div className="text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold mb-3">Noiseless Regime</h3>
              <p className="mb-6">{boolformerContent.results.noiselessRegime}</p>
              
              <div className="my-8">
                {renderPDF(boolformerContent.figures.errorAccNoiseless, "Performance in the noiseless regime")}
                <p className="text-sm text-center mt-2">Performance in the noiseless regime</p>
              </div>

              <h3 className="text-xl font-semibold mb-3">Noisy Regime</h3>
              <p className="mb-6">{boolformerContent.results.noisyRegime}</p>
              
              <div className="my-8">
                {renderPDF(boolformerContent.figures.errorAccNoisy, "Performance in the noisy regime")}
                <p className="text-sm text-center mt-2">Performance in the noisy regime</p>
              </div>

              <h3 className="text-xl font-semibold mb-3">Real-World Applications</h3>
              <h4 className="text-lg font-medium mt-4 mb-2">Binary Classification</h4>
              <p className="mb-6">{boolformerContent.results.realWorldApplications.binaryClassification}</p>
              
              <div className="my-8">
                {renderPDF(boolformerContent.figures.pmlb, "Performance on PMLB benchmark datasets")}
                <p className="text-sm text-center mt-2">Performance on PMLB benchmark datasets</p>
              </div>
              
              <h4 className="text-lg font-medium mt-4 mb-2">Gene Regulatory Networks</h4>
              <p className="mb-6">{boolformerContent.results.realWorldApplications.geneRegulatory}</p>
              
              <div className="my-8">
                {renderPDF(boolformerContent.figures.grn, "Results on Gene Regulatory Network inference")}
                <p className="text-sm text-center mt-2">Results on Gene Regulatory Network inference</p>
              </div>
            </div>
          </section>

          <section id="discussion" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Discussion</h2>
            <div className="text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold mb-3">Limitations</h3>
              <ul className="list-disc pl-6">
                {boolformerContent.discussion.limitations.map((limitation, index) => (
                  <li key={index} className="mb-2">{limitation}</li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold mt-6 mb-3">Future Work</h3>
              <p>{boolformerContent.discussion.futureWork}</p>
            </div>
          </section>

          <section id="conclusion" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Conclusion</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {boolformerContent.conclusion}
            </p>
          </section>

          <section id="appendix" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Appendix</h2>
            <div className="text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold mb-3">Expression Simplification</h3>
              <ul className="list-disc pl-6 mb-4">
                {boolformerContent.appendix.expressionSimplification.benefits.map((benefit, index) => (
                  <li key={index} className="mb-2">{benefit}</li>
                ))}
              </ul>
              <p className="mb-6">{boolformerContent.appendix.expressionSimplification.procedure}</p>
              
              <h3 className="text-xl font-semibold mb-3">Memorization Analysis</h3>
              <p className="mb-6">{boolformerContent.appendix.memorization}</p>

              <h3 className="text-xl font-semibold mb-3">Additional Results</h3>
              <h4 className="text-lg font-medium mt-4 mb-2">Redundancy Analysis</h4>
              <p className="mb-4">{boolformerContent.appendix.additionalResults.redundancyAnalysis}</p>
              
              <div className="my-8">
                {renderPDF(boolformerContent.figures.redundancy, "Redundancy analysis in predicted formulas")}
                <p className="text-sm text-center mt-2">Analysis of redundancy in predicted formulas</p>
              </div>

              <h4 className="text-lg font-medium mt-4 mb-2">Distance Metrics</h4>
              <p className="mb-4">{boolformerContent.appendix.additionalResults.distanceMetrics}</p>
              
              <div className="my-8">
                {renderPDF(boolformerContent.figures.distance, "Distance metrics between predicted and target formulas")}
                <p className="text-sm text-center mt-2">Comparison of different distance metrics</p>
              </div>

              <h4 className="text-lg font-medium mt-4 mb-2">Ablation Studies</h4>
              <h5 className="text-base font-medium mt-3 mb-2">Architecture Choices</h5>
              <p className="mb-4">{boolformerContent.appendix.additionalResults.ablationStudies.architectureChoices}</p>
              <h5 className="text-base font-medium mt-3 mb-2">Training Strategies</h5>
              <p className="mb-4">{boolformerContent.appendix.additionalResults.ablationStudies.trainingStrategies}</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Implementation Details</h3>
              <h4 className="text-lg font-medium mt-4 mb-2">Data Generation</h4>
              <p className="mb-4">{boolformerContent.appendix.implementationDetails.dataGeneration}</p>
              <h4 className="text-lg font-medium mt-4 mb-2">Model Architecture</h4>
              <p className="mb-4">{boolformerContent.appendix.implementationDetails.modelArchitecture}</p>
              
              <h4 className="text-lg font-medium mt-4 mb-2">Hyperparameters</h4>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
                <h5 className="text-base font-medium mb-2">Training</h5>
                <ul className="list-none space-y-1">
                  <li>Batch Size: {boolformerContent.appendix.implementationDetails.hyperparameters.training.batchSize}</li>
                  <li>Learning Rate: {boolformerContent.appendix.implementationDetails.hyperparameters.training.learningRate}</li>
                  <li>Warmup Steps: {boolformerContent.appendix.implementationDetails.hyperparameters.training.warmupSteps}</li>
                  <li>Total Steps: {boolformerContent.appendix.implementationDetails.hyperparameters.training.totalSteps}</li>
                  <li>Optimizer: {boolformerContent.appendix.implementationDetails.hyperparameters.training.optimizer}</li>
                </ul>
                
                <h5 className="text-base font-medium mt-4 mb-2">Model</h5>
                <ul className="list-none space-y-1">
                  <li>Encoder Layers: {boolformerContent.appendix.implementationDetails.hyperparameters.model.encoderLayers}</li>
                  <li>Decoder Layers: {boolformerContent.appendix.implementationDetails.hyperparameters.model.decoderLayers}</li>
                  <li>Attention Heads: {boolformerContent.appendix.implementationDetails.hyperparameters.model.attentionHeads}</li>
                  <li>Embedding Dimension: {boolformerContent.appendix.implementationDetails.hyperparameters.model.embeddingDim}</li>
                  <li>Total Parameters: {boolformerContent.appendix.implementationDetails.hyperparameters.model.totalParams}</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="references" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">References</h2>
            <div className="space-y-2">
              {boolformerContent.references.map((ref) => (
                <p key={ref.id} className="text-sm text-gray-700 dark:text-gray-300">
                  [{ref.id}] {ref.text}
                </p>
              ))}
            </div>
          </section>

          <section id="authors" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Authors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {boolformerContent.authors.map((author, index) => (
                <div key={index} className="text-center">
                  <p className="font-medium">{author.name}</p>
                  <p className="text-zinc-400">{author.affiliation}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 