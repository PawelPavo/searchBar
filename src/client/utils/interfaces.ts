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
    blogid?: number;
};

export interface IHeaders {
    [key: string]: string;
}

export interface ITags {
    id: number;
    name: string;
    created_at: Date;
};

export interface IComments {
    blogid?: number;
    username?: string;
    user_comments?: string;
    created_at?: Date;
}