import * as React from 'react';
import Navbah from '../components/Navbah';
import BlogCard from '../components/BlogCard';
import { IBlogs } from '../utils/interfaces';
import { useState, useEffect } from 'react';
import { Link, useLocation, NavLink, useParams, useHistory } from 'react-router-dom';
import { FaFeather, FaUserPlus } from 'react-icons/fa';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';


const Blogs: React.SFC<BlogsProps> = () => {

    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    const { tagid } = useParams();
    const history = useHistory()
    const [blogs, setBlogs] = useState<IBlogs[]>([])
    const [headerText, setHeaderText] = useState('')


    //authorization disabled to sort by tag, but still active in order to read.
    useEffect(() => {
        // const role = localStorage.getItem('role')
        // if (role !== 'guest') {
        //     history.push({ pathname: '/login', state: { msg: 'You must be logged in to read this blog' } })
        // } else {
            (async () => {
                try {
                    let res = await fetch(`/api/blogs/tags/${tagid}`);
                    let blogs = await res.json();
                    setBlogs(blogs);
                    let [text] = blogs
                    setHeaderText(`${text.tag_name} Blogs`)
                } catch (error) {
                    console.log(error)
                }
            })()
        // }
    }, [tagid]);


    return (
        <main className="container">
            <Helmet>
                <title>{headerText}</title>
            </Helmet>

            <Navbah />
            <h2 className="text-center my-4 text-muted">{headerText}</h2>
            <div>
                <h2 className="text-center my-4 text-muted">{navbarText}</h2>
                <section className="row mt-3 justify-content-end">
                    <div className="col-md-4">
                        <div className="btn-group-vertical blog-btn">
                            <NavLink className="btn btn-block btn-outline-primary btn-lg p-5 text-justify shadow border-0 rounded-bottom bg-light" exact to="/new"><FaFeather /> Write a Blog</NavLink>
                            <br />
                            <Link className="btn btn-block btn-outline-primary btn-lg p-5 text-justify shadow border-0 rounded-top bg-light" to="/register"><FaUserPlus /> Register</Link>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {blogs.map(blog => (
                            <BlogCard key={`blog-${blog.id}`} blog={blog} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}


export interface BlogsProps { }

export default Blogs;