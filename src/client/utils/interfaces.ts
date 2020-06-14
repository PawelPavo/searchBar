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
    userid?: number
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
    [key: string]: any;
    id?: number;
    blogid?: number;
    username?: string;
    user_comment?: string;
    created_at?: Date;
    userid?: number
}