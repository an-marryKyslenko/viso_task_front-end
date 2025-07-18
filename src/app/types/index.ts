export type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
};

export type Recipe = {
	id: string,
	title: string;
	description: string;
	time: string;
	ingredients: { name: string }[];
	instructions: string;
	userId: string
};

export type RecipeFormValues = Omit<Recipe, 'id'>;

export type CommentType = {
	id: string;
	text: string;
	userId: string;
	recipeId: string
};

export type CommentFormVlues = Omit<Recipe, 'id'>