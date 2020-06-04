export interface IBlogs {
    id: number;
    title: string;
    content: string;
    image_url?: string;
    authorid: number;
    created_at: Date;
    name: string;
    tag_name?: string;
    tagid?:number;
};

export interface IHeaders {
    [key: string]: string;
}

export interface ITags {
    id: number;
    name: string;
    created_at: Date;
};