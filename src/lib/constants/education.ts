export interface EducationEntry {
	period: string;
	title: string;
	subtitle?: string;
	detail?: string;
}

const education: EducationEntry[] = [
	{
		period: '2023 — Presente',
		title: 'Ingeniería en Ciencias y Sistemas',
		subtitle: 'Universidad de San Carlos de Guatemala (USAC)',
		detail: 'Séptimo semestre · 190 créditos aprobados.',
	},
];

export default education;
