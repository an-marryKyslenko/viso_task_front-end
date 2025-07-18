type Props = {
	title: string;
	description: string;
	time: string;
	id: string
};

export default function RecipeCard({ title, description, time, id}: Props) {
	return (
		<a href={`/recipes/${id}`} className="bg-white/70 rounded-lg shadow-md p-4 hover:shadow-lg transition">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<p className="text-sm text-gray-600 mb-2">{description}</p>
			<p className="text-sm text-gray-800 font-medium">{time}</p>
		</a>
	);
}