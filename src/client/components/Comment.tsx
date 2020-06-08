import * as React from 'react';
import * as moment from 'moment';
import { IComments } from '../utils/interfaces';
import { useState } from 'react';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';


const CommentCard: React.SFC<CommentCardProps> = ({ comment }) => {

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
            <div className="media col-md-8 border my-1">
                <img className="align-self-start mr-3 mt-1 rounded-circle" src="/avatar.png" alt="image" width="64" height="64" />
                <div className="media-body border border-top-0 border-right-0 border-bottom-0">
                    <div className="col d-flex justify-content-between">
                        <h6 className="mt-3 text-primary">{comment.username}</h6>
                        <small className="mt-3">{moment(comment.created_at).format('MMM Do YYYY')}</small>
                    </div>
                    <div className="col d-flex justify-content-start">
                        <p>{comment.user_comment}</p>
                    </div>
                    <div className="col mb-2 d-flex justify-content-end">
                        <button type="button" onClick={handleDisikes} className="btn btn-outline-danger btn-sm">{dislikes} <FaThumbsDown /></button>
                        <button type="button" onClick={handleLikes} className="btn btn-outline-primary btn-sm ml-1">{likes} <FaThumbsUp /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

interface CommentCardProps {
    comment: IComments
}

export default CommentCard;