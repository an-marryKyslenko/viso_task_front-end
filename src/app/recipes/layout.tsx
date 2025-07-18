import AppLayout from "../components/layout/AppLayout";

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
	return (
		<AppLayout>
			{children}
		</AppLayout>
	);
}