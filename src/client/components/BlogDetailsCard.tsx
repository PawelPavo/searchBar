import * as React from 'react';
import * as moment from 'moment';
import Navbah from './Navbah';
import { Link } from 'react-router-dom';
import { IBlogs } from '../utils/interfaces';
import { FaUndo, } from 'react-icons/fa';



import * as ReactMarkdown from 'react-markdown';
import 'github-markdown-css'


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
                    <Link className="btn btn-outline-warning btn-block mt-3 w-25 mx-auto shadow" to={`/${blogs.id}/edit`}>Edit</Link>
                    <Link to="/blog" className="btn btn-outline-primary btn-block mt-3 w-25 mx-auto shadow"> <FaUndo />  All Blogs</Link>
                </div>
            </div>
        </>
    );
}

export default BlogDetailsCard;