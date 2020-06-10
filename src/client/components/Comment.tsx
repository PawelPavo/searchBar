import * as React from 'react';
import * as moment from 'moment';
import Swal from 'sweetalert2'
import Modali, { useModali } from 'modali';
import { IComments } from '../utils/interfaces';
import { useState } from 'react';
import { FaThumbsDown, FaThumbsUp, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const CommentCard: React.SFC<CommentCardProps> = ({ comment }) => {

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
            location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="media border my-1 mb-3">
                <Link to="/profile">
                    <img className="align-self-start mx-1 my-1 rounded-circle" src="/Avatar.jpeg" alt="image" width="auto" height="64" />
                </Link>
                <div className="media-body border border-top-0 border-right-0 border-bottom-0">
                    <div className="col d-flex mt-3 justify-content-between">
                        <div className="col d-flex justify-content-start mb-3">
                            <Link to="/profile">
                                <small className="text-primary font-weight-light">{comment.username} </small>
                            </Link>
                            <small className="text-muted ml-3 font-weight-light">{moment(comment.created_at).format(' MMM Do YYYY')}</small>
                        </div>
                        <div onClick={toggleCompleteModal} className="" style={{ color: '#be4141', cursor: 'pointer' }}>< FaTimes /></div>
                        <Modali.Modal {...completeModal}></Modali.Modal>
                    </div>
                    <div className="col d-flex justify-content-start ml-3">
                        <p className="">{comment.user_comment}</p>
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