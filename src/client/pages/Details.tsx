import * as React from 'react';
import * as moment from 'moment';
import Navbah from '../components/Navbah';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { IBlogs, IComments, IUser } from '../utils/interfaces';
import { useEffect, useState } from 'react';
import BlogDetailsCard from '../components/BlogDetailsCard'
import CommentCard from '../components/Comment';
import apiServices, { Token } from '../utils/api-services';


export interface DetailsProps { }

const Details: React.SFC<DetailsProps> = props => {

    const [blog, setBlog] = useState<IBlogs>({
        id: 0,
        title: '',
        content: '',
        image_url: '',
        authorid: 0,
        created_at: new Date(),
        name: '',
    });

    const [user, setUser] = useState<IUser>({});
    const { id } = useParams();
    const history = useHistory()
    const [allComments, setAllComments] = useState<IComments[]>([])

    const getComments = React.useCallback(() => {
        (async () => {
            let blogid = id;
            try {
                let res = await fetch(`/api/comments/${blogid}`);
                let allComments = await res.json()
                setAllComments(allComments)
            } catch (error) {
                console.log({ error: 'Unable to get comments' })
            }
        })()
    }, []);

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (role !== 'guest') {
            history.push({ pathname: '/login', state: { msg: 'You must be logged in to read this blog' } })
        } else {
            (async () => {
                let blogid = id
                try {
                    let res = await fetch(`/api/blogs/${blogid}`);
                    let blog = await res.json()
                    setBlog(blog)
                    getComments()
                } catch (error) {
                    console.log({ error: 'Can not get the detail info' })
                }
            })()
        }
    }, [id]);

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (role !== 'guest') {
        } else {
            (async () => {
                try {
                    let res = await fetch(`/auth/profile/`, {
                        headers: { 'Authorization': 'Bearer ' + Token }
                    });
                    let user = await res.json();
                    setUser(user)
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [id])

    const [user_comment, setComment] = useState<string>('')
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const blogid = id
        try {
            await apiServices('/api/comments', 'POST', { blogid, user, user_comment })
            setComment('')
            getComments()
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            e.preventDefault();
            const blogid = id
            try {
                await apiServices('/api/comments', 'POST', { blogid, user, user_comment })
                setComment('')
                getComments()
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <main className="container">
            <Helmet>
                <title>Blog Details</title>
            </Helmet>
            <Navbah />
            <div className="text-center text-muted">
                <h2 className="text-center mt-4 text-muted">{blog.title}</h2>
            </div>
            <div className="row justify-content-center">
                <BlogDetailsCard blogs={blog} />
            </div>
            <div className="sticky-top bg-white">
                <h1 className="text-center font-weight-light">Comments</h1>
                {/* break */}
                {/* <div className="row row justify-content-center mt-3">
                <div className="col-md-8">
                    <h6 className="">{user.email}</h6>
                </div>
                </div> */}
                <div className="row justify-content-center mt-3 sticky-top bg-light">
                    <div className="col-md-6 mt-3">
                        <input className="form-control"
                            type="text"
                            placeholder="Enter your comment ..."
                            value={user_comment}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="row justify-content-end mt-1 mb-3">
                            <small onClick={handleClick} className="border rounded-pill shadow-sm comment-button-hover p-2 mr-3">Comment</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-md-6">
                    {allComments.map(comment => (
                        <CommentCard key={comment.id} comment={comment} getComments={getComments} />
                    ))}
                </div>
            </div>

        </main>
    )
}

export default Details;
