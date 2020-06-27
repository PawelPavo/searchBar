import * as React from 'react';
import Navbah from '../components/Navbah';
import BlogCard from '../components/BlogCard';
import { IBlogs, ITags } from '../utils/interfaces';
import { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import { FaUndo } from 'react-icons/fa';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';


const Blogs: React.SFC<BlogsProps> = () => {

    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    const { tagid } = useParams();
    const history = useHistory()
    const [blogs, setBlogs] = useState<IBlogs[]>([])
    const [headerText, setHeaderText] = useState('')
    const [tags, setTags] = useState<ITags[]>([]);

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
                <title>{(headerText) === '' ? 'No Blogs' : (headerText)}</title>
            </Helmet>
            <Navbah />
            <h2 className="text-center my-4 text-muted">{(headerText) === '' ? `Sorry, we don't have any blogs with this tag` : (headerText)}</h2>
            <div>
                <h2 className="text-center my-4 text-muted">{navbarText}</h2>
                <div className="row justify-content-center">
                    {blogs.map(blog => (
                        <BlogCard key={`blog-${blog.id}`} blog={blog} />
                    ))}
                </div>
            </div>
            <Link to="/blog" className="btn btn-outline-secondary btn-block mt-3 w-50 mx-auto shadow"> <FaUndo />  Back to All Blogs</Link>
        </main>
    )
}


export interface BlogsProps { }

export default Blogs;