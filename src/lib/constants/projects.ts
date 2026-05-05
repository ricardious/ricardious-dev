import { v4 as uuidv4 } from "uuid";
import coverImg from "@/assets/projects/semestrix/overview-main.webp";
import coverImgSmall from "@/assets/projects/semestrix/cover-small.webp";
import visual1 from "@/assets/projects/semestrix/cover.webp";
import landingDark from "@/assets/projects/semestrix/landing-dark.webp";
import landingLight from "@/assets/projects/semestrix/landing-light.webp";
import loginModal from "@/assets/projects/semestrix/login-modal.webp";
import dashboardProgress from "@/assets/projects/semestrix/dashboard-progress.webp";
import dashboardSemester from "@/assets/projects/semestrix/dashboard-semester.webp";
import dashboardSchedule from "@/assets/projects/semestrix/dashboard-schedule.webp";
import dashboardProfile from "@/assets/projects/semestrix/dashboard-profile.webp";
import dashboardSettings from "@/assets/projects/semestrix/dashboard-settings.webp";
import dashboardOverview from "@/assets/projects/semestrix/dashboard-overview.webp";
import physicsDeviceMockup from "@/assets/projects/physics-lab-portal/device-mockup.webp";
import physicsFullPage from "@/assets/projects/physics-lab-portal/full-page.webp";
import physicsLaptopMockup from "@/assets/projects/physics-lab-portal/laptop-mockup.webp";

interface ProjectSection {
  eyebrow: string;
  title: string;
  body: string[];
}

interface ProjectToolGroup {
  label: string;
  items: string[];
}

interface ProjectGalleryItem {
  src: string;
  alt: string;
  wide?: boolean;
}

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
  overview?: string;
  highlights?: string[];
  sections?: ProjectSection[];
  toolGroups?: ProjectToolGroup[];
  gallery?: ProjectGalleryItem[];
  websiteLink?: string;
}

const projectsData: Omit<Project, "id" | "index">[] = [
  {
    name: "Semestrix",
    path: "semestrix",
    title: "Semestrix",
    coverImg: coverImg.src,
    coverImgSmall: coverImgSmall.src,
    visual1: visual1.src,
    date: "2026",
    role: "Product Design, Frontend Development",
    techs: ["React 19", "TypeScript", "FastAPI", "PostgreSQL"],
    websiteLink: "https://semestrix.ricardious.workers.dev/",
    description:
      "Plataforma de planificación académica enfocada en organización semestral, creación de horarios, seguimiento del progreso y visualización de datos del estudiante.",
    overview:
      "Semestrix es un sistema de planificación académica pensado para estudiantes de ingeniería. Reúne organización de cursos, horarios semanales, historial académico, planificación de semestres y seguimiento del progreso en una sola experiencia de producto.",
    highlights: [
      "Landing, onboarding y vistas internas diseñadas como un solo sistema visual.",
      "Planificación semanal, organización por semestre e historial académico dentro del mismo flujo.",
      "Frontend estructurado con Atomic Design, custom hooks y capa de servicios.",
      "Backend API construido alrededor de auth, scraping, historial, perfiles, cursos, horarios y analíticas.",
    ],
    sections: [
      {
        eyebrow: "Contexto",
        title: "Diseñado alrededor del flujo académico real",
        body: [
          "El objetivo no era solo mostrar datos, sino ayudar al estudiante a entender en qué punto está dentro de la carrera, qué cursos puede llevar después y cómo cada decisión de semestre afecta su progreso a largo plazo.",
          "Eso implicó diseñar un producto capaz de moverse con naturalidad entre planificación, validación, visualización y uso diario sin sentirse como un conjunto de herramientas separadas.",
        ],
      },
      {
        eyebrow: "Sistema",
        title: "Frontend y backend pensados como un solo producto",
        body: [
          "El frontend resuelve la capa interactiva: landing, dashboard, constructor de horarios, flujos de perfil y vistas académicas. El backend soporta autenticación, datos académicos, scraping, historial y endpoints de analíticas.",
          "Juntos forman un asistente académico mucho más completo que un dashboard aislado.",
        ],
      },
      {
        eyebrow: "Enfoque",
        title: "Claridad visual sin perder profundidad de producto",
        body: [
          "La interfaz usa tarjetas de alto contraste, flujos guiados y una jerarquía clara para mantener legible información académica compleja. La animación y el acabado visual se usan para orientar, no para distraer del objetivo principal.",
          "El resultado es un producto expresivo, pero anclado en utilidad, orden y progresión.",
        ],
      },
    ],
    toolGroups: [
      {
        label: "Frontend",
        items: [
          "React 19",
          "TypeScript",
          "Vite 7",
          "Tailwind CSS 4",
          "TanStack Query",
          "React Router DOM 7",
          "Framer Motion",
          "Three.js + React Three Fiber",
        ],
      },
      {
        label: "Backend",
        items: [
          "FastAPI",
          "SQLAlchemy",
          "PostgreSQL / Neon",
          "JWT Auth",
          "Pydantic",
          "httpx + aiohttp",
          "BeautifulSoup + lxml",
        ],
      },
      {
        label: "Alcance",
        items: [
          "Landing y onboarding",
          "Planificación semanal de horarios",
          "Importación de historial académico",
          "Organización por semestre",
          "Seguimiento del progreso",
          "Perfiles y analíticas",
        ],
      },
    ],
    gallery: [
      {
        src: landingDark.src,
        alt: "Presentación principal de Semestrix",
      },
      {
        src: landingLight.src,
        alt: "Semestrix landing page in light mode",
      },
      {
        src: loginModal.src,
        alt: "Semestrix login modal",
      },
      {
        src: dashboardProgress.src,
        alt: "Semestrix dashboard progress view",
      },
      {
        src: dashboardSemester.src,
        alt: "Semestrix semester planning dashboard",
      },
      {
        src: dashboardSchedule.src,
        alt: "Semestrix weekly schedule builder",
      },
      {
        src: dashboardProfile.src,
        alt: "Semestrix profile dashboard",
      },
      {
        src: dashboardSettings.src,
        alt: "Semestrix settings page",
      },
      {
        src: dashboardOverview.src,
        alt: "Semestrix dashboard overview",
      },
    ],
  },
  {
    name: "Physics Lab Portal",
    path: "physics-lab-portal",
    title: "Portal de Laboratorios de Fisica",
    coverImg: physicsLaptopMockup.src,
    coverImgSmall: physicsLaptopMockup.src,
    visual1: physicsDeviceMockup.src,
    date: "2025",
    role: "Product Design, Frontend Development",
    techs: ["Astro 6", "React 19", "Tailwind CSS 4", "GitHub Pages"],
    websiteLink: "https://ricardious.github.io/physics-lab-portal/",
    description:
      "Portal academico para centralizar manuales, documentos y herramientas de los laboratorios de Fisica de la Facultad de Ingenieria con una experiencia mucho mas clara y util.",
    overview:
      "Physics Lab Portal reorganiza recursos academicos dispersos en una interfaz estatica, rapida y facil de navegar. El proyecto replantea la arquitectura de contenido del sitio actual para que estudiantes y docentes encuentren practicas, programas, plantillas y software sin friccion.",
    highlights: [
      "Rediseño enfocado en la organizacion de contenido y acceso rapido a recursos recurrentes del laboratorio.",
      "Experiencia pensada para funcionar incluso sin JavaScript, manteniendo acceso a documentos y descargas.",
      "Jerarquia visual oscura y tecnica alineada con el contexto academico y el tipo de material consultado.",
      "Despliegue estatico en GitHub Pages con stack ligero y mantenimiento simple.",
    ],
    sections: [
      {
        eyebrow: "Problema",
        title: "Convertir un repositorio de recursos en una experiencia util",
        body: [
          "El reto principal no era solo modernizar la interfaz, sino ordenar informacion academica extensa sin perder acceso directo a archivos, manuales y utilidades que los estudiantes necesitan durante el semestre.",
          "La solucion parte de una arquitectura clara por categorias y de bloques destacados que reducen el tiempo de busqueda sin convertir el sitio en una navegacion pesada.",
        ],
      },
      {
        eyebrow: "Sistema",
        title: "Contenido, navegacion y consulta rapida como un solo flujo",
        body: [
          "El portal agrupa herramientas, documentos academicos y manuales por tipo de recurso, pero tambien conserva relaciones practicas entre software, plantillas, programas y material por curso.",
          "Eso permite que la pagina funcione como indice, centro de consulta y punto de descarga dentro de la misma experiencia.",
        ],
      },
      {
        eyebrow: "Implementacion",
        title: "Un sitio estatico ligero con soporte progresivo",
        body: [
          "La implementacion con Astro, React y Tailwind prioriza tiempos de carga bajos, mantenimiento sencillo y despliegue continuo en GitHub Pages.",
          "El resultado es un producto academico sobrio, accesible y suficientemente flexible para crecer con nuevos documentos y recursos institucionales.",
        ],
      },
    ],
    toolGroups: [
      {
        label: "Frontend",
        items: ["Astro 6", "React 19", "TypeScript", "Tailwind CSS 4"],
      },
      {
        label: "Producto",
        items: [
          "Arquitectura de informacion",
          "UX para recursos academicos",
          "Priorizacion por categorias",
          "Acceso progresivo sin JavaScript",
        ],
      },
      {
        label: "Alcance",
        items: [
          "Herramientas y software tecnico",
          "Documentos y plantillas",
          "Manuales y programas por curso",
          "Despliegue estatico en GitHub Pages",
        ],
      },
    ],
    gallery: [
      {
        src: physicsFullPage.src,
        alt: "Captura adicional de pagina completa del Physics Lab Portal",
        wide: true,
      },
    ],
  },
];

const projects: Project[] = projectsData.map((project, index) => ({
  ...project,
  id: uuidv4(),
  index,
}));

export default projects;
