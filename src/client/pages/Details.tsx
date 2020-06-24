import * as React from 'react';
import Navbah from '../components/Navbah';
import { FaSmile } from 'react-icons/fa';
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
            <div className="col border border-left-0 border-right-0 border-top-0">
                <h1 className="text-center font-weight-light">Comments</h1>
            </div>
            <section className="row mt-3 justify-content-center mb-5">
                <div className="col-md-8">
                    <form className="form-group p-3 rounded border-0 bg-light">
                        <div className="col-10 mx-auto">
                            <h6 className="text-start">{user.email}</h6>
                        </div>
                        <div className="col-10 mx-auto input-group mb-3 mx-auto">
                            <input className="form-control mb-3 border-primary border-top-0 border-left-0 border-right-0 bg-light rounded-0"
                                type="text"
                                placeholder="Enter your comment ..."
                                value={user_comment}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <div className="input-group-append">
                                <a className="btn btn-sm my-auto text-primary">
                                    <FaSmile />
                                </a>
                            </div>
                        </div>
                        <button onClick={handleClick} type="button" className="btn btn-outline-primary btn-lg btn-block mt-3 w-50 mx-auto">Post</button>
                    </form>
                </div>
                <div className="col-md-6">
                    {allComments.map(comment => (
                        <CommentCard key={comment.id} comment={comment} getComments={getComments}/>
                    ))}
                </ div>
            </section>

        </main>
    )
}

export default Details;
