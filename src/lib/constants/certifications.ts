export interface Certification {
	name: string;
	issuer: string;
	year: string;
	/** Enlace a la credencial. Déjalo vacío ("") si no tienes uno. */
	credentialUrl?: string;
}

// TODO: reemplaza estos ejemplos con tus certificaciones reales.
const certifications: Certification[] = [
	{
		name: "Python para todos",
		issuer: "University of Michigan · Coursera",
		year: "2024",
		credentialUrl: "",
	},
	{
		name: "Desarrollo web responsivo",
		issuer: "freeCodeCamp",
		year: "2023",
		credentialUrl: "",
	},
	{
		name: "Algoritmos y estructuras de datos",
		issuer: "freeCodeCamp",
		year: "2023",
		credentialUrl: "",
	},
];

export default certifications;
