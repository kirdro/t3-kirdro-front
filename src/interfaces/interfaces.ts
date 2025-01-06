export interface IUser {
	createdAt: Date;
	updatedAt: Date;
	id: string;
	name: string;
	email: string;
	emailVerified: Date;
	image: string;
	role: TRole;
	// accounts: '';
	// sessions: '';
	// posts: ''
}

export type TRole = 'USER' | 'ADMIN';

export interface IPost {
	content: string;
	createdAt: Date;
	createdById: string;
	id: number;
	name: string;
	published: false;
	updatedAt: Date;
	userImg: string;
	userName: string;
}

export interface IMessage {
	id: number;
	text: string;
	userImg: string;
	userName: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
}

export interface IUserAut {
	id: string;
	name: string;
	email: string;
	emailVerified: null;
	image: string;
}

export interface ISession {
	user: IUserAut;
	id: string;
	sessionToken: string;
	userId: string;
	expires: Date;
}
