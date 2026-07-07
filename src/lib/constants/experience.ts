export interface ExperienceEntry {
	period: string;
	title: string;
	subtitle?: string;
	detail?: string;
}

// TODO: reemplaza con tu experiencia real.
const experience: ExperienceEntry[] = [
	{
		period: "2024 — Presente",
		title: "Desarrollador Full-Stack Freelance",
		subtitle: "Independiente · Guatemala",
		detail:
			"Diseño y desarrollo de sitios y aplicaciones web para marcas y startups, de la interfaz al backend.",
	},
	{
		period: "2023 — 2024",
		title: "Desarrollador Frontend",
		subtitle: "Empresa / Proyecto",
		detail: "Descripción breve de tu rol y logros en esta posición.",
	},
];

export default experience;
