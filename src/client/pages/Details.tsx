import * as React from 'react';
import Navbah from '../components/Navbah';
import { useLocation, RouteComponentProps } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';
import { IBlogs } from '../utils/interfaces';
import { useEffect, useState } from 'react';
import BlogDetailsCard from '../components/BlogDetailsCard'


export interface DetailsProps extends RouteComponentProps<{ id: string }> { }

const Details: React.SFC<DetailsProps> = props => {
    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    const [blog, setBlog] = useState<IBlogs>({
        id: 0,
        title: '',
        content: '',
        image_url: '',
        authorid: 0,
        created_at: new Date(),
        name: '',
    });

    useEffect(() => {
        (async () => {
            let blogid = props.match.params.id
            try {
                let res = await fetch(`/api/blogs/${blogid}`);
                let blog = await res.json()
                setBlog(blog)
                console.log(res)
            } catch (error) {
                console.log({ error: 'Can not get the detail info' })
            }
        })()
    }, [props.match.params.id]);

    return (
        <main className="container-fluid">
            <Helmet>
                <title>Blog Details</title>
            </Helmet>
            <Navbah />
            <div className="text-center text-muted">
                <h2 >Blog Details</h2>
            </div>
            <section className="justify-content-center mt-5">
                
                    <BlogDetailsCard blogs={blog} />
              
            </section>
        </main>
    )
}

export default Details;
