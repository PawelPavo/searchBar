import * as React from 'react';
import { IBlogs } from '../utils/interfaces';
import { Link } from 'react-router-dom';
import { FaEye, } from 'react-icons/fa';
import * as moment from 'moment';

const BlogCard: React.SFC<BlogCardProps> = props => {

    return (
        <>
            <div className="card my-5 shadow border-0">
                <div className="row no-gutters">
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="text-center mb-5">
                                <Link className="btn btn-outline-primary btn-block mt-3 w-75 mx-auto" to={`${props.blog.id}/details`}><FaEye /> View Blog</Link>
                            </div>
                            <div>
                                <small className="text-muted">{moment(props.blog.created_at).format('MMM Do YYYY')}</small>
                                <h5>{props.blog.title}</h5>
                            </div>
                        </div>
                        <div className="row justify-content-around my-3">
                            <small className="text-muted">Written by: {props.blog.name}</small>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img src={props.blog.image_url} className="card-img image-fluid" alt="..." width="300" height="275" />
                    </div>
                </div>
            </div>
            <div className="justify-content-around border-bottom border-secondary"></div>
        </>
    )
}


interface BlogCardProps {
    blog: IBlogs
}

export default BlogCard;