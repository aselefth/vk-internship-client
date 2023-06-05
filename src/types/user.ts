import { PostType } from "./post";

export type UserType = {
	id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	age: number;
	city: string;
	university: string;
	posts?: PostType[];
	likedPosts?: PostType[];
	filePath: string;
};

export type SignUpType = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	age: number;
	city: string;
	university: string;
}
