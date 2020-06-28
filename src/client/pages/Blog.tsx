import * as React from 'react';
import Navbah from '../components/Navbah';
import BlogCard from '../components/BlogCard';
import { IBlogs, ITags } from '../utils/interfaces';
import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';


const Blogs: React.SFC<BlogsProps> = () => {

  const { pathname } = useLocation()
  const navbarText = getPathText(pathname)
  const [blogs, setBlogs] = useState<IBlogs[]>([])
  const [tags, setTags] = useState<ITags[]>([]);
  const history = useHistory()

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch('/api/blogs');
        let blogs = await res.json();
        setBlogs(blogs);
      } catch (error) {
        console.log(error)
      }
    })()
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch('/api/tags');
        let tags = await res.json();
        setTags(tags);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <main className="container">
        <Helmet>
          <title> All {navbarText}</title>
        </Helmet>
        <Navbah />
        <div>
          <h2 className="text-center my-4 text-muted">All {navbarText}</h2>
        </div>
        <div className="row justify-content-center mb-4 blog-button">
          {tags.map(tag => (
            < small key={tag.id} onClick={() => history.push(`/${tag.id}/tags`)} className="border rounded-pill px-3 py-1 mx-3 shadow-sm blog-button-hover text-muted text-center">{tag.name}</small>
          ))}
        </div>
        <div className="row justify-content-center">
          {blogs.map(blog => (
            <BlogCard key={`blog-${blog.id}`} blog={blog} />
          ))}
        </div>
      </main>
    </>
  )
}


export interface BlogsProps { }

export default Blogs;