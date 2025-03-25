export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  paragraphs: string[];
  profileImage: {
    src: string;
    alt: string;
  };
  educationTitle: string;
  educationSectionTitle: string;
  skillsTitle: string;
  technicalExpertiseTitle: string;
  languagesTitle: string;
  certificationsTitle: string;
}

export const aboutData: AboutData = {
  title: "About Me",
  subtitle: "Applied Mathematician & AI Researcher",
  description: "Learn about my background, education, and skills.",
  paragraphs: [
    "My academic journey has taken me through EPFL for my Bachelor's in Mathematics, ETH Zürich for my Master's in Applied Mathematics, and included an exchange year at KTH Royal Institute of Technology in Stockholm.",
    "I'm passionate about cutting-edge research and contributing to transformative advancements in AI. My work focuses on mathematical reasoning with deep learning, where I've developed novel approaches combining symbolic methods with LLMs. I've also ventured into artificial life research, contributing to the development of algorithms to discover complex emergent behaviors in high-dimensional systems.",
    "Beyond research, I've been actively involved in student organizations, including Festival Balélec, Europe's largest student festival. I've also worked as a freelance web developer, creating professional websites for various businesses and organizations, which has given me valuable experience in translating complex requirements into user-friendly solutions."
  ],
  profileImage: {
    src: "/profile.jpg",
    alt: "Arthur Renard"
  },
  educationTitle: "Education & Skills",
  educationSectionTitle: "Education",
  skillsTitle: "Technical Expertise",
  technicalExpertiseTitle: "Technical Expertise",
  languagesTitle: "Languages",
  certificationsTitle: "Certifications & Honors"
}; 