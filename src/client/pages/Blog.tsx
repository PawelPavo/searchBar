import * as React from 'react';
import Navbah from '../components/Navbah';
import { IBlogs } from '../utils/interfaces';
import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';

const Blogs: React.SFC<BlogsProps> = () => {

  const [blogs, setBlogs] = useState<IBlogs[]>([])

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch('api/blogs');
        let blogs = await res.json();
        setBlogs(blogs);
      } catch (error) {
        console.log(error)
      }
    })()
  }, []);

  return (
    <main className="container">
      <Navbah />

      <div>
        <section className="row mt-3 justify-content-center">
          <div className="col-md-8">
            {blogs.map(blogs => (
              <BlogCard key={`blog-${blogs.id}`} blog={blogs} />
            ))}
          </div>
        </section>
      </div>

    </main>
  )
}


export interface BlogsProps { }

export default Blogs;