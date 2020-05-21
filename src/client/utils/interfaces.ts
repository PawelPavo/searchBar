export interface IBlogs {
    id: number;
    title: string;
    content: string;
    image_url?: string;
    authorid: number;
    created_at: Date;
    name: string;
};

export interface IHeaders {
    [key: string]: string;
}