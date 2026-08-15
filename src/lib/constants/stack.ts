export interface StackItem {
	name: string;
	/** slug del logo en src/assets/tech/<slug>.svg (Simple Icons) */
	slug: string;
}

export interface StackGroup {
	label: string;
	items: StackItem[];
}

// Ajusta libremente a tu stack real.
const stack: StackGroup[] = [
	{
		label: 'Frontend',
		items: [
			{ name: 'React', slug: 'react' },
			{ name: 'Next.js', slug: 'nextdotjs' },
			{ name: 'TypeScript', slug: 'typescript' },
			{ name: 'Astro', slug: 'astro' },
			{ name: 'Tailwind CSS', slug: 'tailwindcss' },
			{ name: 'Three.js / R3F', slug: 'threedotjs' },
			{ name: 'GSAP', slug: 'greensock' },
		],
	},
	{
		label: 'Backend',
		items: [
			{ name: 'Python', slug: 'python' },
			{ name: 'FastAPI', slug: 'fastapi' },
			{ name: 'SQLAlchemy', slug: 'sqlalchemy' },
			{ name: 'Node.js', slug: 'nodedotjs' },
		],
	},
	{
		label: 'Bases de datos',
		items: [
			{ name: 'PostgreSQL', slug: 'postgresql' },
			{ name: 'MongoDB', slug: 'mongodb' },
		],
	},
	{
		label: 'Herramientas',
		items: [
			{ name: 'Git', slug: 'git' },
			{ name: 'Figma', slug: 'figma' },
			{ name: 'Vite', slug: 'vite' },
			{ name: 'Biome', slug: 'biome' },
			{ name: 'Cloudflare', slug: 'cloudflare' },
		],
	},
];

export default stack;
