import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { IBlogs } from '../utils/interfaces';
import { FaUndo, } from 'react-icons/fa';
import * as ReactMarkdown from 'react-markdown';
import 'github-markdown-css'
import { urlRegex } from '../utils/url-regex'


export interface BlogDetailsCardProps {
    blogs: IBlogs,
}

const BlogDetailsCard: React.SFC<BlogDetailsCardProps> = ({ blogs }) => {


    return (
        <>
            <div className="col-md-8">
                <div className="card border-0">
                    <div className="card-header text-center bg-white border-primary">
                        <h6 className="card-title text-muted">Written by: {blogs.name}</h6>
                    </div>
                    <div className="card-body">
                        <Link to={`/${blogs.tagid}/tags`} className="border rounded-pill px-3 py-1 mx-3 shadow-sm blog-button-hover text-muted">{blogs.tag_name}</Link>
                        <div className="col-md-4 mx-auto my-2">
                            <img src={blogs.image_url} className="card-img image-fluid" alt="..." width="auto" height="auto" />
                        </div>
                        <div className="col">
                            <div className="card overflow-auto border-0" style={{ minHeight: '302px' }}>
                                <div className="markdown-body">
                                    <ReactMarkdown source={blogs.content} />
                                </div>
                            </div>
                        </div>
                        <p className="text-muted text-center mt-3">{moment(blogs.created_at).format('MMM Do YYYY')}</p>
                    </div>
                </div>
                <div className="row justify-content-between mb-5">
                    <Link className=" my-auto text-warning btn btn-block mt-3 w-25 mx-auto shadow-sm border rounded-pill blog-button-hover" to={`/${blogs.id}/edit/${urlRegex(blogs.title)}`}>Edit</Link>
                    <Link to="/blog" className="my-auto text-muted btn btn-block mt-3 w-50 mx-auto shadow-sm border rounded-pill blog-button-hover"> <FaUndo />  All Blogs</Link>
                </div>
                <br />
            </div>
        </>
    );
}

export default BlogDetailsCard;