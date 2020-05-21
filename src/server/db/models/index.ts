export interface BlogsT {
    id: number;
    title: string;
    content: string;
    image_url: string;
    authorid: number;
    created_at: Date;
};

export interface AuthorsT {
    id: number;
    name: string;
    email: string;
    created_at: Date;
};

export interface TUsers {
    id?: number;
    email?: string;
    password?: string;
    role?: string;
    created_at?: Date;
}