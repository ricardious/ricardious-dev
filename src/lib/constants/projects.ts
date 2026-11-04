import { v4 as uuidv4 } from 'uuid';
import algemifyAlgorithmEditor from '@/assets/projects/algemify/algorithm-editor.webp';
import algemifyArena from '@/assets/projects/algemify/arena.webp';
import algemifyArenaInternal from '@/assets/projects/algemify/arena-internal.webp';
import algemifyCompanions from '@/assets/projects/algemify/companions.webp';
import algemifyCourse from '@/assets/projects/algemify/course.webp';
import algemifyCover from '@/assets/projects/algemify/cover.webp';
import algemifyCreateAccount from '@/assets/projects/algemify/create-account.webp';
import algemifyDashboard from '@/assets/projects/algemify/dashboard.webp';
import algemifyDashboardLearning from '@/assets/projects/algemify/dashboard-learning.webp';
import algemifyDashboardMonitor from '@/assets/projects/algemify/dashboard-monitor-mockup.webp';
import algemifyDashboardSkills from '@/assets/projects/algemify/dashboard-skills.webp';
import algemifyForum from '@/assets/projects/algemify/forum.webp';
import algemifyFriends from '@/assets/projects/algemify/friends.webp';
import algemifyGitEditor from '@/assets/projects/algemify/git-editor.webp';
import algemifyGit from '@/assets/projects/algemify/git-playground.webp';
import algemifyLandingMonitor from '@/assets/projects/algemify/landing-monitor-mockup.webp';
import algemifyLaptop from '@/assets/projects/algemify/laptop-mockup.webp';
import algemifyLaptopSmall from '@/assets/projects/algemify/laptop-mockup-small.webp';
import algemifyLeaderboard from '@/assets/projects/algemify/leaderboard.webp';
import algemifyLearn from '@/assets/projects/algemify/learn.webp';
import algemifyPaths from '@/assets/projects/algemify/learning-paths.webp';
import algemifyLesson from '@/assets/projects/algemify/lesson.webp';
import algemifyMessages from '@/assets/projects/algemify/messages.webp';
import algemifyMissions from '@/assets/projects/algemify/missions.webp';
import algemifyOnboardingCompanion from '@/assets/projects/algemify/onboarding-companion.webp';
import algemifyOnboardingFocus from '@/assets/projects/algemify/onboarding-focus.webp';
import algemifyOnboardingHandle from '@/assets/projects/algemify/onboarding-handle.webp';
import algemifyOnboardingOrigin from '@/assets/projects/algemify/onboarding-origin.webp';
import algemifyPractice from '@/assets/projects/algemify/practice.webp';
import algemifyProfile from '@/assets/projects/algemify/profile.webp';
import algemifyProgramLab from '@/assets/projects/algemify/program-lab.webp';
import algemifyRewards from '@/assets/projects/algemify/rewards.webp';
import algemifySeason from '@/assets/projects/algemify/season.webp';
import algemifySignIn from '@/assets/projects/algemify/sign-in.webp';
import algemifySqlEditor from '@/assets/projects/algemify/sql-editor.webp';
import algemifySql from '@/assets/projects/algemify/sql-playground.webp';
import algemifyTournaments from '@/assets/projects/algemify/tournaments.webp';
import liquidCover from '@/assets/projects/liquid-glass-sandbox/cover.webp';
import liquidCoverSmall from '@/assets/projects/liquid-glass-sandbox/cover-small.webp';
import liquidFullPage from '@/assets/projects/liquid-glass-sandbox/full-page.webp';
import physicsDeviceMockup from '@/assets/projects/physics-lab-portal/device-mockup.webp';
import physicsFullPage from '@/assets/projects/physics-lab-portal/full-page.webp';
import physicsLaptopMockup from '@/assets/projects/physics-lab-portal/laptop-mockup.webp';
import visual1 from '@/assets/projects/semestrix/cover.webp';
import coverImgSmall from '@/assets/projects/semestrix/cover-small.webp';
import dashboardOverview from '@/assets/projects/semestrix/dashboard-overview.webp';
import dashboardProfile from '@/assets/projects/semestrix/dashboard-profile.webp';
import dashboardProgress from '@/assets/projects/semestrix/dashboard-progress.webp';
import dashboardSchedule from '@/assets/projects/semestrix/dashboard-schedule.webp';
import dashboardSemester from '@/assets/projects/semestrix/dashboard-semester.webp';
import dashboardSettings from '@/assets/projects/semestrix/dashboard-settings.webp';
import landingDark from '@/assets/projects/semestrix/landing-dark.webp';
import landingLight from '@/assets/projects/semestrix/landing-light.webp';
import loginModal from '@/assets/projects/semestrix/login-modal.webp';
import coverImg from '@/assets/projects/semestrix/overview-main.webp';

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

const projectsData: Omit<Project, 'id' | 'index'>[] = [
	{
		name: 'Algemify',
		path: 'algemify',
		title: 'Algemify',
		coverImg: algemifyLaptop.src,
		coverImgSmall: algemifyLaptopSmall.src,
		visual1: algemifyLandingMonitor.src,
		date: '2026',
		role: 'Product Design, Frontend Development',
		techs: ['Next.js', 'React', 'Tailwind CSS', 'SQL'],
		websiteLink: 'https://algemify.ricardious.dev/',
		description:
			'Plataforma de aprendizaje y práctica de programación con retos de algoritmos, SQL y Git, rutas guiadas y duelos competitivos dentro de una interfaz inspirada en un sistema operativo.',
		overview:
			'Algemify reúne aprendizaje, práctica y competencia en una experiencia para desarrolladores. El recorrido empieza con la configuración del perfil y la elección de un compañero animado, y continúa en un dashboard con estación orbital, objetivos diarios y mapa de habilidades. Los cursos combinan lecciones, diagramas ejecutables y evaluaciones, mientras la práctica y la arena conectan problemas de programación, retos y duelos.',
		highlights: [
			'Problemas de algoritmos, SQL y Git con evaluación en el servidor contra pruebas ocultas.',
			'Demos públicas con consultas SQL ejecutables y una terminal Git interactiva en el navegador.',
			'Salas privadas para competir con amigos y duelos clasificados por rating.',
			'Rutas de aprendizaje con lecciones, diagramas interactivos y evaluaciones por unidad.',
			'Onboarding, compañeros animados, logros y recompensas conectados con la progresión del estudiante.',
		],
		sections: [
			{
				eyebrow: 'Concepto',
				title: 'Aprender, practicar y competir en un mismo lugar',
				body: [
					'El producto conecta lecciones breves con problemas prácticos y desafíos competitivos. Las rutas se desbloquean en orden para dar continuidad al aprendizaje, mientras la práctica permite explorar distintos temas al propio ritmo.',
					'Los retos diarios, las misiones y las temporadas añaden objetivos recurrentes alrededor de la resolución de problemas.',
				],
			},
			{
				eyebrow: 'Experiencia',
				title: 'Probar las herramientas desde la portada',
				body: [
					'La landing permite ejecutar consultas sobre una base de datos de ejemplo y explorar comandos Git sin crear una cuenta. El editor, los esquemas de tablas y los resultados muestran la interacción con las herramientas antes de entrar a la plataforma.',
					'La arena presenta dos formas de competir: salas privadas con amigos y emparejamiento por rating para duelos individuales.',
				],
			},
			{
				eyebrow: 'Identidad',
				title: 'Un universo de código y constelaciones',
				body: [
					'La dirección visual toma referencias de terminales y paneles de control: tipografía monoespaciada, bordes finos, módulos numerados y acentos violeta, cian y rojo sobre fondo oscuro.',
					'Los planetas ASCII animados, el mapa de aprendizaje y las órbitas de clasificación convierten la progresión en una parte reconocible de la identidad del producto.',
				],
			},
		],
		toolGroups: [
			{
				label: 'Frontend',
				items: ['Next.js', 'React', 'Tailwind CSS', 'Gráficos ASCII animados'],
			},
			{
				label: 'Práctica',
				items: [
					'Algoritmos en JavaScript, TypeScript, Python, Java y Rust',
					'Editor y consultas SQL',
					'Terminal Git interactiva',
					'Evaluación con pruebas ocultas',
				],
			},
			{
				label: 'Producto',
				items: [
					'Rutas y lecciones',
					'Retos diarios y misiones',
					'Salas privadas',
					'Duelos por rating',
					'Temporadas y clasificación',
				],
			},
		],
		gallery: [
			{
				src: algemifyLandingMonitor.src,
				alt: 'Mockup de la portada de Algemify en un monitor de escritorio',
			},
			{
				src: algemifyDashboardMonitor.src,
				alt: 'Mockup del dashboard de Algemify en un monitor de escritorio',
			},
			{
				src: algemifyCover.src,
				alt: 'Captura de la portada de Algemify con planeta ASCII',
				wide: true,
			},
			{
				src: algemifySignIn.src,
				alt: 'Acceso a Algemify antes de iniciar sesión',
			},
			{
				src: algemifyCreateAccount.src,
				alt: 'Registro de una cuenta nueva en Algemify',
			},
			{
				src: algemifyOnboardingHandle.src,
				alt: 'Onboarding de Algemify: elección del nombre de usuario',
			},
			{
				src: algemifyOnboardingOrigin.src,
				alt: 'Onboarding de Algemify: año de nacimiento y país sin completar',
			},
			{
				src: algemifyOnboardingFocus.src,
				alt: 'Onboarding de Algemify: experiencia, objetivos e intereses',
			},
			{
				src: algemifyOnboardingCompanion.src,
				alt: 'Onboarding de Algemify: selección de un compañero animado',
			},
			{
				src: algemifyDashboard.src,
				alt: 'Dashboard de Algemify con compañero, estación orbital y estadísticas',
			},
			{
				src: algemifyDashboardLearning.src,
				alt: 'Dashboard de Algemify con aprendizaje, arena y objetivos diarios',
			},
			{
				src: algemifyDashboardSkills.src,
				alt: 'Dashboard de Algemify con mapa de habilidades y temporada',
			},
			{
				src: algemifyPractice.src,
				alt: 'Banco de problemas de Algemify y reto diario',
			},
			{
				src: algemifyAlgorithmEditor.src,
				alt: 'Editor de algoritmos de Algemify con el problema Bracket balance',
			},
			{
				src: algemifySqlEditor.src,
				alt: 'Editor de retos SQL de Algemify con esquema de tablas y consulta inicial',
			},
			{
				src: algemifyGitEditor.src,
				alt: 'Terminal de retos Git de Algemify con el objetivo y estado del repositorio',
			},
			{
				src: algemifyLearn.src,
				alt: 'Catálogo de cursos y rutas de aprendizaje de Algemify',
			},
			{
				src: algemifyCourse.src,
				alt: 'Curso de introducción a la programación con progreso y temario',
			},
			{
				src: algemifyLesson.src,
				alt: 'Lección de introducción a la programación dentro de Algemify',
			},
			{
				src: algemifyProgramLab.src,
				alt: 'Laboratorio interactivo de programación con diagrama de flujo, variables y salida',
			},
			{
				src: algemifyArenaInternal.src,
				alt: 'Arena de Algemify con duelos clasificados y configuración de salas privadas',
			},
			{
				src: algemifyMissions.src,
				alt: 'Retos diarios y misiones semanales de Algemify',
			},
			{
				src: algemifyLeaderboard.src,
				alt: 'Clasificación de Algemify y niveles por rating',
			},
			{
				src: algemifySeason.src,
				alt: 'Temporada First Light de Algemify y tabla de puntos',
			},
			{
				src: algemifyCompanions.src,
				alt: 'Hangar de compañeros animados de Algemify',
			},
			{
				src: algemifyRewards.src,
				alt: 'Recompensas de Algemify con BITS, personalización y logros',
			},
			{
				src: algemifyProfile.src,
				alt: 'Perfil de Algemify con estadísticas, actividad y logros',
			},
			{
				src: algemifyTournaments.src,
				alt: 'Vista de torneos de Algemify sin competiciones registradas',
			},
			{
				src: algemifyForum.src,
				alt: 'Foro de Algemify con categorías para la comunidad',
			},
			{
				src: algemifyFriends.src,
				alt: 'Vista de amigos y solicitudes de Algemify',
			},
			{
				src: algemifyMessages.src,
				alt: 'Bandeja de mensajes de Algemify sin conversaciones',
			},
			{
				src: algemifySql.src,
				alt: 'Demo pública de SQL en Algemify con editor, esquema de tablas y resultados de una consulta',
			},
			{
				src: algemifyGit.src,
				alt: 'Demo pública de Git en Algemify con terminal interactiva e historial de commits',
			},
			{
				src: algemifyArena.src,
				alt: 'Presentación de las salas privadas y los duelos por rating de Algemify',
			},
			{
				src: algemifyPaths.src,
				alt: 'Mapa de constelaciones con las rutas de aprendizaje de Algemify',
			},
		],
	},
	{
		name: 'Semestrix',
		path: 'semestrix',
		title: 'Semestrix',
		coverImg: coverImg.src,
		coverImgSmall: coverImgSmall.src,
		visual1: visual1.src,
		date: '2026',
		role: 'Product Design, Frontend Development',
		techs: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
		websiteLink: 'https://semestrix.ricardious.dev/',
		description:
			'Plataforma de planificación académica enfocada en organización semestral, creación de horarios, seguimiento del progreso y visualización de datos del estudiante.',
		overview:
			'Semestrix es un sistema de planificación académica pensado para estudiantes de ingeniería. Reúne organización de cursos, horarios semanales, historial académico, planificación de semestres y seguimiento del progreso en una sola experiencia de producto.',
		highlights: [
			'Landing, onboarding y vistas internas diseñadas como un solo sistema visual.',
			'Planificación semanal, organización por semestre e historial académico dentro del mismo flujo.',
			'Frontend estructurado con Atomic Design, custom hooks y capa de servicios.',
			'Backend API construido alrededor de auth, scraping, historial, perfiles, cursos, horarios y analíticas.',
		],
		sections: [
			{
				eyebrow: 'Contexto',
				title: 'Diseñado alrededor del flujo académico real',
				body: [
					'El objetivo no era solo mostrar datos, sino ayudar al estudiante a entender en qué punto está dentro de la carrera, qué cursos puede llevar después y cómo cada decisión de semestre afecta su progreso a largo plazo.',
					'Eso implicó diseñar un producto capaz de moverse con naturalidad entre planificación, validación, visualización y uso diario sin sentirse como un conjunto de herramientas separadas.',
				],
			},
			{
				eyebrow: 'Sistema',
				title: 'Frontend y backend pensados como un solo producto',
				body: [
					'El frontend resuelve la capa interactiva: landing, dashboard, constructor de horarios, flujos de perfil y vistas académicas. El backend soporta autenticación, datos académicos, scraping, historial y endpoints de analíticas.',
					'Juntos forman un asistente académico mucho más completo que un dashboard aislado.',
				],
			},
			{
				eyebrow: 'Enfoque',
				title: 'Claridad visual sin perder profundidad de producto',
				body: [
					'La interfaz usa tarjetas de alto contraste, flujos guiados y una jerarquía clara para mantener legible información académica compleja. La animación y el acabado visual se usan para orientar, no para distraer del objetivo principal.',
					'El resultado es un producto expresivo, pero anclado en utilidad, orden y progresión.',
				],
			},
		],
		toolGroups: [
			{
				label: 'Frontend',
				items: [
					'React',
					'TypeScript',
					'Vite 7',
					'Tailwind CSS 4',
					'TanStack Query',
					'React Router DOM 7',
					'Framer Motion',
					'Three.js + React Three Fiber',
				],
			},
			{
				label: 'Backend',
				items: [
					'FastAPI',
					'SQLAlchemy',
					'PostgreSQL / Neon',
					'JWT Auth',
					'Pydantic',
					'httpx + aiohttp',
					'BeautifulSoup + lxml',
				],
			},
			{
				label: 'Alcance',
				items: [
					'Landing y onboarding',
					'Planificación semanal de horarios',
					'Importación de historial académico',
					'Organización por semestre',
					'Seguimiento del progreso',
					'Perfiles y analíticas',
				],
			},
		],
		gallery: [
			{
				src: landingDark.src,
				alt: 'Presentación principal de Semestrix',
			},
			{
				src: landingLight.src,
				alt: 'Semestrix landing page in light mode',
			},
			{
				src: loginModal.src,
				alt: 'Semestrix login modal',
			},
			{
				src: dashboardProgress.src,
				alt: 'Semestrix dashboard progress view',
			},
			{
				src: dashboardSemester.src,
				alt: 'Semestrix semester planning dashboard',
			},
			{
				src: dashboardSchedule.src,
				alt: 'Semestrix weekly schedule builder',
			},
			{
				src: dashboardProfile.src,
				alt: 'Semestrix profile dashboard',
			},
			{
				src: dashboardSettings.src,
				alt: 'Semestrix settings page',
			},
			{
				src: dashboardOverview.src,
				alt: 'Semestrix dashboard overview',
			},
		],
	},
	{
		name: 'Liquid Glass',
		path: 'liquid-glass-sandbox',
		title: 'Liquid Glass',
		coverImg: liquidCover.src,
		coverImgSmall: liquidCoverSmall.src,
		visual1: liquidCover.src,
		date: '2026',
		role: 'Creative Development, Graphics Engineering',
		techs: ['Astro 7', 'TypeScript', 'Tailwind CSS 4', 'SVG Filters'],
		websiteLink: 'https://ricardious.github.io/liquid-glass-sandbox/',
		description:
			'Estudio interactivo de refracción, óptica y tensión superficial en la web. Un sistema de liquid glass construido con matemáticas puras, mapas de desplazamiento SVG y Astro.',
		overview:
			'Liquid Glass trata el vidrio líquido como un pipeline de render, no como un blur decorativo. Cada componente (lente, botón, switch, slider, cursor, input y tarjetas) recrea la forma en que la luz se refracta y se dobla a través de una superficie de vidrio real, combinando desplazamiento SVG, reconstrucción especular y clonado del DOM en tiempo real.',
		highlights: [
			'Galería de componentes de vidrio líquido: lente, botón táctil, switch, slider, cursor y campos de entrada, cada uno con su propia física.',
			'Refracción y aberración cromática en tiempo real sobre contenido complejo del DOM, no un simple desenfoque.',
			'Mapas de desplazamiento RG y una pasada especular generados por código a partir de la ecuación de superficie.',
			'Panel de parámetros en vivo (bezel, grosor, IOR, refracción, blur, especular, saturación) para ajustar cada material.',
		],
		sections: [
			{
				eyebrow: 'Concepto',
				title: 'El vidrio como material, no como efecto',
				body: [
					'El objetivo no era imitar un cristal esmerilado con un blur, sino reconstruir el comportamiento óptico real de una superficie de vidrio: cómo la luz se dobla en el bezel, cómo el fondo se distorsiona y cómo el borde recupera su brillo húmedo.',
					'Cada demo de la galería aísla una pieza de interfaz (lente, botón, switch, slider, cursor o input) para mostrar ese mismo material aplicado a un contexto de producto distinto.',
				],
			},
			{
				eyebrow: 'Pipeline',
				title: 'De la ecuación de superficie al desplazamiento SVG',
				body: [
					'Cada forma parte de un perfil de superficie 1D cuya curva define la inclinación del borde. El código muestrea esa curva, calcula las normales y aproxima el rayo refractado para obtener un desplazamiento por punto.',
					'Esas muestras se expanden en una textura RG que alimenta el filtro de desplazamiento SVG, mientras una segunda pasada reconstruye el brillo especular para que el vidrio se lea pulido y no solo distorsionado.',
				],
			},
			{
				eyebrow: 'Implementación',
				title: 'Clonado del DOM y ajuste interactivo',
				body: [
					'El renderer clona la escena dentro de los límites del vidrio y la dobla a través del filtro, de modo que la refracción reacciona al contenido y al movimiento reales de la página.',
					'Blur, saturación, alpha especular, escala de refracción, geometría y comportamiento de resortes quedan expuestos como controles, para que cada componente pueda sentirse materialmente diferente.',
				],
			},
		],
		toolGroups: [
			{
				label: 'Frontend',
				items: ['Astro 7', 'TypeScript', 'Tailwind CSS 4', 'JavaScript vanilla'],
			},
			{
				label: 'Render',
				items: [
					'Ecuación de superficie 1D',
					'Muestreo de refracción',
					'Mapa de desplazamiento RG (SVG)',
					'Pasada especular',
					'Clonado del DOM en tiempo real',
				],
			},
			{
				label: 'Alcance',
				items: [
					'Galería de componentes de vidrio',
					'Generador de filtros SVG',
					'Documentación How It Works',
					'Despliegue estático en GitHub Pages',
				],
			},
		],
		gallery: [
			{
				src: liquidFullPage.src,
				alt: 'Vista completa de la galería interactiva de Liquid Glass',
				wide: true,
			},
		],
	},
	{
		name: 'Physics Lab Portal',
		path: 'physics-lab-portal',
		title: 'Portal de Laboratorios de Fisica',
		coverImg: physicsLaptopMockup.src,
		coverImgSmall: physicsLaptopMockup.src,
		visual1: physicsDeviceMockup.src,
		date: '2025',
		role: 'Product Design, Frontend Development',
		techs: ['Astro 6', 'React', 'Tailwind CSS 4', 'GitHub Pages'],
		websiteLink: 'https://ricardious.github.io/physics-lab-portal/',
		description:
			'Portal academico para centralizar manuales, documentos y herramientas de los laboratorios de Fisica de la Facultad de Ingenieria con una experiencia mucho mas clara y util.',
		overview:
			'Physics Lab Portal reorganiza recursos academicos dispersos en una interfaz estatica, rapida y facil de navegar. El proyecto replantea la arquitectura de contenido del sitio actual para que estudiantes y docentes encuentren practicas, programas, plantillas y software sin friccion.',
		highlights: [
			'Rediseño enfocado en la organizacion de contenido y acceso rapido a recursos recurrentes del laboratorio.',
			'Experiencia pensada para funcionar incluso sin JavaScript, manteniendo acceso a documentos y descargas.',
			'Jerarquia visual oscura y tecnica alineada con el contexto academico y el tipo de material consultado.',
			'Despliegue estatico en GitHub Pages con stack ligero y mantenimiento simple.',
		],
		sections: [
			{
				eyebrow: 'Problema',
				title: 'Convertir un repositorio de recursos en una experiencia util',
				body: [
					'El reto principal no era solo modernizar la interfaz, sino ordenar informacion academica extensa sin perder acceso directo a archivos, manuales y utilidades que los estudiantes necesitan durante el semestre.',
					'La solucion parte de una arquitectura clara por categorias y de bloques destacados que reducen el tiempo de busqueda sin convertir el sitio en una navegacion pesada.',
				],
			},
			{
				eyebrow: 'Sistema',
				title: 'Contenido, navegacion y consulta rapida como un solo flujo',
				body: [
					'El portal agrupa herramientas, documentos academicos y manuales por tipo de recurso, pero tambien conserva relaciones practicas entre software, plantillas, programas y material por curso.',
					'Eso permite que la pagina funcione como indice, centro de consulta y punto de descarga dentro de la misma experiencia.',
				],
			},
			{
				eyebrow: 'Implementacion',
				title: 'Un sitio estatico ligero con soporte progresivo',
				body: [
					'La implementacion con Astro, React y Tailwind prioriza tiempos de carga bajos, mantenimiento sencillo y despliegue continuo en GitHub Pages.',
					'El resultado es un producto academico sobrio, accesible y suficientemente flexible para crecer con nuevos documentos y recursos institucionales.',
				],
			},
		],
		toolGroups: [
			{
				label: 'Frontend',
				items: ['Astro 6', 'React', 'TypeScript', 'Tailwind CSS 4'],
			},
			{
				label: 'Producto',
				items: [
					'Arquitectura de informacion',
					'UX para recursos academicos',
					'Priorizacion por categorias',
					'Acceso progresivo sin JavaScript',
				],
			},
			{
				label: 'Alcance',
				items: [
					'Herramientas y software tecnico',
					'Documentos y plantillas',
					'Manuales y programas por curso',
					'Despliegue estatico en GitHub Pages',
				],
			},
		],
		gallery: [
			{
				src: physicsFullPage.src,
				alt: 'Captura adicional de pagina completa del Physics Lab Portal',
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
