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
