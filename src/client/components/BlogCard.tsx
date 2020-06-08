import * as React from 'react';
import * as moment from 'moment';
import { IBlogs } from '../utils/interfaces';
import { Link } from 'react-router-dom';
import { FaEye, FaCommentAlt, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { urlRegex } from '../utils/url-regex'
import { useEffect, useState } from 'react';


const BlogCard: React.SFC<BlogCardProps> = props => {

    const [commentCount, setCommentCount] = useState<number>(0)

    useEffect(() => {
        (async () => {
            try {
                let res = await fetch(`/api/comments/count/${props.blog.id}`);
                let [commentCount] = await res.json();
                setCommentCount(commentCount.count)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [props.blog.id]);

    const [likes, setLikes] = useState<number>(0)
    const [dislikes, setDislikes] = useState<number>(0)

    const handleLikes = () => {
        setLikes(likes + 1)
    }

    const handleDisikes = () => {
        setDislikes(dislikes + 1)
    }

    return (
        <>
            <div className="card my-5 shadow border-primary">
                <div className="row no-gutters">
                    <div className="col-md-8 ">

                        <Link to={`/${props.blog.tagid}/tags`} className="tag-button btn btn-sm shadow border-rounded bg-primary border-primary">{props.blog.tag_name}</Link>

                        <div className="card-body ">

                            <div className="text-center mb-5">
                                <Link className="btn btn-outline-primary btn-block mt-3 w-75 mx-auto" to={`/${props.blog.id}/details/${urlRegex(props.blog.title)}`}><FaEye /> View Blog</Link>
                            </div>
                            <div className=" row justify-content-around">
                                <small className="text-muted">Written by: {props.blog.name}</small>
                                <small className="text-muted">{moment(props.blog.created_at).format('MMM Do YYYY')} </small>
                            </div>
                            <div className="row justify-content-around px-5 mb-1">
                                <h6 className="long-text">{props.blog.title}</h6>
                            </div>
                            <div className="row justify-content-between px-5">
                                <div><FaCommentAlt /> {commentCount}</div>
                                <div>
                                    <button type="button" onClick={handleDisikes} className="btn btn-outline-danger btn-sm border-0 ">{dislikes} <FaThumbsDown /></button>
                                    <button type="button" onClick={handleLikes} className="btn btn-outline-primary btn-sm ml-2 border-0">{likes} <FaThumbsUp /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img src={props.blog.image_url} className="card-img image-fluid" alt="..." width="300" height="275" />
                    </div>
                </div>
            </div>
        </>
    )
}


interface BlogCardProps {
    blog: IBlogs
}

export default BlogCard;