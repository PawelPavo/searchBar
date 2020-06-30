import * as React from 'react';
import * as moment from 'moment';
import { IBlogs } from '../utils/interfaces';
import { useHistory } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import { urlRegex } from '../utils/url-regex'
import { useEffect, useState } from 'react';


const BlogCard: React.SFC<BlogCardProps> = props => {
    const history = useHistory()
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

    return (
        <>
            <div onClick={() => history.push(`/${props.blog.id}/details/${urlRegex(props.blog.title)}`)} className="col-md-5 border border2 m-2 bg-white">
                <div className="row my-3">
                    <div className="col-2 text-right">
                        <img src={props.blog.image_url} className="" alt="..." style={{ width: "48", height: "48", objectFit: "contain", opacity: "50%" }} />
                    </div>
                    <div className="col-8 my-auto">
                        <h6 className="">{props.blog.title.substring(0, 30)}...</h6>
                    </div>
                    <div className="col-2 my-auto text-right text-primary">
                        <div><FaComments /> {commentCount}</div>
                    </div>
                </div>
                <div className="col mb-3">
                    <small className="text-monospace text-muted">{props.blog.content.substring(0, 97)}...</small>
                </div>
            </div>

            {/* <div className="card">
                <div className="row">
                    <div className="col">
                        <div className="col">
                            <img src={props.blog.image_url} className="card-img img-fluid" alt="..." height="auto" width="64"/>
                        </div>
                        <Link to={`/${props.blog.tagid}/tags`} className="btn-sm btn-primary">{props.blog.tag_name}</Link>
                        <div className="card-body ">
                            <div className="text-center mb-5">
                                <Link className="btn btn-dark btn-block mt-3 w-75 mx-auto rounded-0" to={`/${props.blog.id}/details/${urlRegex(props.blog.title)}`}><FaEye /> View Blog</Link>
                            </div>
                            <div className="row justify-content-around">
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
                </div>
            </div> */}
        </>
    )
}


interface BlogCardProps {
    blog: IBlogs
}

export default BlogCard;