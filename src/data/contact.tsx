import { Mail, MapPin, Linkedin, Github, Award } from "lucide-react";
import { ReactNode } from "react";

interface ContactInfo {
  icon: ReactNode;
  label: string;
  href: string | null;
}

export const contactInfo: ContactInfo[] = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "arthurenard@icloud.com",
    href: "mailto:arthurenard@icloud.com",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/arthur-renard-3211471b6/",
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub Profile",
    href: "https://github.com/arthurenard",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Lausanne, Switzerland",
    href: null,
  },
];

export const certifications = [
  {
    icon: <Award className="w-5 h-5" />,
    title: "Cambridge English Certification",
    level: "C1",
    year: "2023",
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Belgian Mathematical Olympiad",
    level: "Finalist",
    year: "2017",
  },
];
