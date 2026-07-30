export interface Certification {
	name: string;
	issuer: string;
	year: string;
	/** Enlace a la credencial. Déjalo vacío ("") si no tienes uno. */
	credentialUrl?: string;
}

const certifications: Certification[] = [
	{
		name: 'Inteligencia Artificial con Python',
		issuer: 'Samsung Innovation Campus · FUNDESTEAM',
		year: '2025',
		credentialUrl: '/certs/samsung-innovation-campus-ai.pdf',
	},
	{
		name: 'Diploma — Festival Cultural y Científico VÓRTICE',
		issuer: 'USAC',
		year: '2025',
		credentialUrl: '',
	},
	{
		name: 'Introducción a Java',
		issuer: 'INTECAP',
		year: '2024',
		credentialUrl: '',
	},
	{
		name: 'Técnicas para el Análisis de Documentación',
		issuer: 'USAC · Diplomado Estrategias de Lectura',
		year: '2024',
		credentialUrl: '',
	},
	{
		name: 'Microsoft Word, Excel, Internet y Windows',
		issuer: 'SAE/SAP',
		year: '2023',
		credentialUrl: '',
	},
	{
		name: 'Técnico en Sistemas de Informática (Nivel Inicial)',
		issuer: 'COMPUCEIC',
		year: '2022',
		credentialUrl: '',
	},
];

export default certifications;
