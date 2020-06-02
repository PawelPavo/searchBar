import * as React from 'react';
import Swal from 'sweetalert2'
import Navbah from '../components/Navbah';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { IBlogs } from '../utils/interfaces';
import { useState, useEffect } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import apiServices from '../utils/api-services';

const Edit: React.FC<IEditProps> = () => {
    const { id } = useParams();
    const history = useHistory()

    const [blog, setBlog] = useState<IBlogs>({
        id: 0,
        title: '',
        content: '',
        image_url: '',
        authorid: 0,
        created_at: new Date(),
        name: '',
    });

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [image_url, setImage_url] = useState<string>('');

    useEffect(() => {
        (async () => {
            let blogid = id;
            try {
                let res = await fetch(`/api/blogs/${blogid}`);
                let blog = await res.json()
                setBlog(blog)
                setTitle(blog.title);
                setContent(blog.content);
                setImage_url(blog.image_url)
            } catch (error) {
                console.log({ error: 'My code is not working' })
            }
        })()
    }, [id]);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let blogid = id;
        try {
            await apiServices(`/api/blogs/${blogid}`, 'PUT', { title, content, image_url })
        } catch (error) {
            console.log(error);
        }
        history.push('/blog');
    }

    const deleteBlog = async (id: number) => {
        try {
            await apiServices(`/api/blogs/${id}`, 'DELETE')
            // await fetch(`/api/blogs/${id}`, {
            //     method: 'DELETE'
            // });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your blog has been deleted!',
            })
            history.push('/blog')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="container">
            <Helmet>
                <title>Blog Edit</title>
            </Helmet>

            <Navbah />
            <h2 className="text-center my-4 text-muted">Blog Edit</h2>

            <section className="row mt-5 justify-content-center">
                <div className="col-md-12">
                    <form className="form-group p-3 rounded border-0 shadow bg-light">
                        <div className="col-10 mx-auto">
                            <input className="form-control mb-5 border-primary border-top-0 border-left-0 border-right-0 bg-light rounded-0" type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <input className="form-control mb-5 border-primary border-top-0 border-left-0 border-right-0 bg-light rounded-0"
                                    type="text" placeholder="Enter image URL ..."
                                    value={image_url}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage_url(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <img src={blog.image_url} className="card-img image-fluid" alt="..." width="auto" height="auto" />
                            </div>
                        </div>
                        <div className="row form-group mt-5">
                            <div className="col-md-10 mx-auto">
                                <textarea
                                    className="form-control shadow"
                                    rows={12}
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="row justify-content-center mb-5">
                            <small className="text-muted">*Markdown is supported</small>
                        </div>
                        <div className="row justify-content-around">
                            <button onClick={() => deleteBlog(id)} type="button" className="btn btn-outline-danger w-25 shadow"><FaTimes /> Delete</button>
                            <NavLink exact to='/blog' className="btn btn-outline-warning w-25 shadow">Cancel</NavLink>
                            <button onClick={handleClick} type="button" className="btn btn-outline-primary w-25 shadow"><FaCheck /> Submit Changes</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export interface IEditProps { }



export default Edit;