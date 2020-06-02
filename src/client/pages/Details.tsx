import * as React from 'react';
import Navbah from '../components/Navbah';
import { useLocation, RouteComponentProps, useParams, useHistory } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';
import { IBlogs } from '../utils/interfaces';
import { useEffect, useState } from 'react';
import BlogDetailsCard from '../components/BlogDetailsCard'
import blogs from '../../server/db/queries/blogs';
import Typist from 'react-typist';



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

    const { id } = useParams();
    const history = useHistory()
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
                } catch (error) {
                    console.log({ error: 'Can not get the detail info' })
                }
            })()
        }
    }, [id]);

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
        </main>
    )
}

export default Details;
