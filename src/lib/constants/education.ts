export interface EducationEntry {
	period: string;
	title: string;
	subtitle?: string;
	detail?: string;
}

// TODO: confirma / ajusta con tus estudios reales.
const education: EducationEntry[] = [
	{
		period: "2021 — Presente",
		title: "Ingeniería en Ciencias y Sistemas",
		subtitle: "Universidad de San Carlos de Guatemala (USAC)",
	},
];

export default education;
