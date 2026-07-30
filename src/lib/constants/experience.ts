export interface ExperienceEntry {
	period: string;
	title: string;
	subtitle?: string;
	detail?: string;
}

const experience: ExperienceEntry[] = [
	{
		period: '2025',
		title: 'Portal del Departamento de Matemática',
		subtitle: 'Facultad de Ingeniería · USAC',
		detail:
			'Desarrollé y publiqué el módulo de estadísticas del sitio e implementé componentes de interfaz reutilizables (modales, iconos y vistas). Cargué y estructuré masivamente exámenes y material en video, y mejoré la navegación y la consistencia de los datos.',
	},
	{
		period: '2025',
		title: 'Voluntario — Pruebas Específicas de Ingreso',
		subtitle: 'Facultad de Ingeniería · USAC',
		detail:
			'Supervisor de aplicación durante la jornada de pruebas: logística general, revisión y verificación de datos de los aspirantes, y coordinación del flujo de participantes.',
	},
	{
		period: '2024',
		title: 'Sistema de Inventarios — Escuela de Historia',
		subtitle: 'Proyecto en equipo · USAC',
		detail:
			'Desarrollo en equipo de un sistema de inventarios. Me encargué de organizar y gestionar la información para mantenerlo preciso y actualizado, facilitando el acceso rápido a los datos.',
	},
	{
		period: '2024',
		title: 'Voluntario — Congresos de Ciencias y Sistemas',
		subtitle: 'Escuela de Ciencias y Sistemas · USAC',
		detail:
			'Registro y bienvenida de participantes, orientación a los asistentes y apoyo en la logística general del evento.',
	},
];

export default experience;
