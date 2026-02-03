import { v4 as uuidv4 } from "uuid";

export interface Project {
  id: string;
  index: number;
  name: string;
  path: string;
  title: string;
  coverImg: string;
  coverImgSmall: string;
  visual1: string;
  date: string;
  role: string;
  techs: string[];
  description: string;
  websiteLink?: string;
}

// Using Picsum for placeholder images
const getImage = (id: number, width = 800, height = 600) =>
  `https://picsum.photos/id/${id}/${width}/${height}`;

const projectsData: Omit<Project, "id" | "index">[] = [
  {
    name: "Portfolio",
    path: "digital-portfolio",
    title: "Portfolio",
    coverImg: getImage(1015, 1200, 800),
    coverImgSmall: getImage(1015, 600, 400),
    visual1: getImage(1015, 1200, 800),
    date: "Apr. 2025",
    role: "Designer, Dev",
    techs: ["Figma, React"],
    websiteLink: "https://ricardious.dev/",
    description:
      "A modern portfolio showcasing creative work and development projects with an emphasis on user experience and visual storytelling.",
  },
  {
    name: "Studio",
    path: "creative-studio",
    title: "Studio",
    coverImg: getImage(1016, 1200, 800),
    coverImgSmall: getImage(1016, 600, 400),
    visual1: getImage(1016, 1200, 800),
    date: "May 2025",
    role: "Designer, Dev",
    techs: ["Figma, Photoshop, React"],
    description:
      "A bold and immersive digital experience designed to showcase creative work through innovative interactions and stunning visuals.",
    websiteLink: "https://ricardious.dev/",
  },
  {
    name: "System",
    path: "design-system",
    title: "System",
    coverImg: getImage(1018, 1200, 800),
    coverImgSmall: getImage(1018, 600, 400),
    visual1: getImage(1018, 1200, 800),
    date: "Aug. 2022",
    role: "Designer, Dev",
    techs: ["Figma, Photoshop, React"],
    description:
      "A comprehensive design system created to ensure consistency across digital products with reusable components and clear documentation.",
    websiteLink: "https://ricardious.dev/",
  },
  {
    name: "Gallery",
    path: "visual-gallery",
    title: "Gallery",
    coverImg: getImage(1019, 1200, 800),
    coverImgSmall: getImage(1019, 600, 400),
    visual1: getImage(1019, 1200, 800),
    date: "Apr. 2022",
    role: "Designer",
    techs: ["Figma, Photoshop, Protopie"],
    description:
      "An elegant gallery experience designed to showcase visual work with attention to detail and sophisticated animations.",
  },
  {
    name: "Interactive",
    path: "interactive-experience",
    title: "Interactive",
    coverImg: getImage(1020, 1200, 800),
    coverImgSmall: getImage(1020, 600, 400),
    visual1: getImage(1020, 1200, 800),
    date: "Mar. 2024",
    role: "Designer, Developer",
    techs: ["Figma, React"],
    description:
      "An immersive interactive experience featuring advanced animations and engaging user interactions built with modern web technologies.",
    websiteLink: "https://ricardious.dev/",
  },
  {
    name: "E-commerce",
    path: "ecommerce-platform",
    title: "E-commerce",
    coverImg: getImage(1021, 1200, 800),
    coverImgSmall: getImage(1021, 600, 400),
    visual1: getImage(1021, 1200, 800),
    date: "Dec. 2023",
    role: "Designer, AD",
    techs: ["Figma, React"],
    description:
      "A modern e-commerce platform redesign focusing on user experience, conversion optimization, and brand consistency.",
  },
  {
    name: "Branding",
    path: "brand-identity",
    title: "Branding",
    coverImg: getImage(1022, 1200, 800),
    coverImgSmall: getImage(1022, 600, 400),
    visual1: getImage(1022, 1200, 800),
    date: "Jan. 2024",
    role: "Designer, Developer",
    techs: ["Figma, React"],
    description:
      "A complete brand identity project featuring logo design, visual guidelines, and digital presence across multiple touchpoints.",
  },
  {
    name: "Web App",
    path: "web-application",
    title: "Web App",
    coverImg: getImage(1024, 1200, 800),
    coverImgSmall: getImage(1024, 600, 400),
    visual1: getImage(1024, 1200, 800),
    date: "Mar. 2024",
    role: "Designer, Developer",
    techs: ["Figma, React"],
    description:
      "A full-featured web application with a focus on usability, performance, and modern design patterns.",
    websiteLink: "https://ricardious.dev/",
  },
  {
    name: "Mobile",
    path: "mobile-first",
    title: "Mobile",
    coverImg: getImage(1025, 1200, 800),
    coverImgSmall: getImage(1025, 600, 400),
    visual1: getImage(1025, 1200, 800),
    date: "Feb. 2024",
    role: "Designer, Developer",
    techs: ["Figma, React"],
    description:
      "A mobile-first approach to web design ensuring optimal experience across all devices with responsive layouts and touch-friendly interactions.",
    websiteLink: "https://ricardious.dev/",
  },
  {
    name: "Typography",
    path: "typography-showcase",
    title: "Typography",
    coverImg: getImage(1027, 1200, 800),
    coverImgSmall: getImage(1027, 600, 400),
    visual1: getImage(1027, 1200, 800),
    date: "Dec. 2022",
    role: "Designer",
    techs: ["Figma, Photoshop, Protopie"],
    description:
      "A minimalist and modern showcase exploring typography, layout, and visual hierarchy through interactive design.",
  },
  {
    name: "Minimal",
    path: "minimalist-design",
    title: "Minimal",
    coverImg: getImage(1028, 1200, 800),
    coverImgSmall: getImage(1028, 600, 400),
    visual1: getImage(1028, 1200, 800),
    date: "Sept. 2022",
    role: "Designer",
    techs: ["Figma, Photoshop"],
    description:
      "A minimalist design approach focusing on clean lines, whitespace, and essential elements to create elegant digital experiences.",
  },
];

const projects: Project[] = projectsData.map((project, index) => ({
  ...project,
  id: uuidv4(),
  index,
}));

export default projects;
