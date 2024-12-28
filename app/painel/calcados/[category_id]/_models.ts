type InitialStateEntries = {
	message: string;
	fieldValues: CreateUserFormEntries;
}

type CreateUserFormEntries = {
	id: string;
	name: string;
	sole: string;
	color: string;
	note: string;
}

export type {
	InitialStateEntries,
	CreateUserFormEntries
}