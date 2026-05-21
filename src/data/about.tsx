export interface AboutData {
  title: string;
  description: string;
  paragraphs: string[];
  profileImage: {
    src: string;
    alt: string;
  };
  educationTitle: string;
  skillsTitle: string;
}

export const aboutData: AboutData = {
  title: "About",
  description:
    "Applied mathematician working on machine learning, currently building games and evaluations for language models.",
  paragraphs: [
    "Originally from Belgium, I moved to Switzerland to study mathematics at EPFL and applied mathematics at ETH Zürich",
    "I am currently a founding engineer and ML researcher at Xent Labs, where we develop Xent Games: an open-ended space of games for language models that produces measurable signals on reasoning, anticipation and cooperation.",
    "Outside of research, I have built and shipped production websites for organisations including Festival Balélec, Europe's largest student festival.",
  ],
  profileImage: {
    src: "/profile.jpg",
    alt: "Arthur Renard",
  },
  educationTitle: "Education",
  skillsTitle: "Skills",
};
