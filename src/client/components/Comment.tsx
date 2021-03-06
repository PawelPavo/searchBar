//@ts-nocheck

import * as React from 'react';
import * as moment from 'moment';
import Modali, { useModali } from 'modali';
import { IComments } from '../utils/interfaces';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CommentCard: React.SFC<CommentCardProps> = ({ comment, getComments }) => {

    const [completeModal, toggleCompleteModal] = useModali({
        animated: true,
        title: 'Are you sure?',
        message: 'Deleting this comment will be permanent.',
        buttons: [
            <Modali.Button
                label="Cancel"
                isStyleCancel
                onClick={() => toggleCompleteModal()}
            />,
            <Modali.Button
                label="Delete"
                isStyleDestructive
                onClick={() => deleteComment(comment.id)}
            />,
        ],
    });

    const [likes, setLikes] = useState<number>(0)
    const [dislikes, setDislikes] = useState<number>(0)

    const handleLikes = () => {
        setLikes(likes + 1)
    }

    const handleDisikes = () => {
        setDislikes(dislikes + 1)
    }

    const deleteComment = async (id: number) => {
        try {
            await fetch(`/api/comments/${comment.id}`, {
                method: 'DELETE'
            });
            getComments()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="media border my-1 mb-3 shadow-sm">
                <Link to="/profile">
                    <img className="align-self-start mx-1 my-1 rounded-circle" src={comment.image} alt="image" width="auto" height="48" />
                </Link>
                <div className="media-body border border-top-0 border-right-0 border-bottom-0">
                    <div className="col d-flex mt-3 justify-content-between">
                        <div className="col d-flex justify-content-start mb-3 ">
                            <Link to="/profile">
                                <small className="text-primary font-weight-light">{comment.name} </small>
                            </Link>
                            <small className="text-muted ml-3 font-weight-light">{moment(comment.created_at).format(' MMM Do YYYY')}</small>
                        </div>
                        <div onClick={toggleCompleteModal} className="delete-comment-hover delete-comment " style={{ cursor: 'pointer',}}>< FaTimes /></div>
                        <Modali.Modal {...completeModal}></Modali.Modal>
                    </div>
                    <div className="col d-flex justify-content-start ml-3">
                        <p className="font-weight-light font-italic ml-2">{comment.user_comment}</p>
                    </div>
                    {/* <div className="col mb-2 d-flex justify-content-end">
                        <button type="button" onClick={handleDisikes} className="btn btn-outline-danger btn-sm">{dislikes} <FaThumbsDown /></button>
                        <button type="button" onClick={handleLikes} className="btn btn-outline-primary btn-sm ml-1">{likes} <FaThumbsUp /></button>
                    </div> */}
                </div>
            </div>
        </>
    )
}

interface CommentCardProps {
    comment: IComments;
    getComments: () => void;
}

export default CommentCard;