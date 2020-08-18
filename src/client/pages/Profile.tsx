import * as React from 'react';
import Navbah from '../components/Navbah';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { IUser, IBlogs } from '../utils/interfaces';
import { Token } from '../utils/api-services'
import BlogCard from '../components/BlogCard';
import Draggable from "react-draggable";

const Profile: React.FC<IProfileProps> = () => {

    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    const history = useHistory()
    const [user, setUser] = useState<IUser>({});
    const [blogs, setBlogs] = useState<IBlogs[]>([])

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (role !== 'guest') {
            history.push({ pathname: '/login', state: { msg: 'You must be logged in to see this page' } })
        } else {
            (async () => {
                try {
                    let res = await fetch(`/auth/profile/`, {
                        headers: { 'Authorization': 'Bearer ' + Token }
                    });
                    let user = await res.json();
                    setUser(user)
                    let resUser = await fetch(`/api/blogs/user/${user.id}`);
                    let blogs = await resUser.json();
                    setBlogs(blogs);
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [])

    return (
        <>
            <main className="container">
                <Helmet>
                    <title>{navbarText}</title>
                </Helmet>
                <Navbah />
                <h2 className="text-center my-4 text-muted">{navbarText}</h2>
                <div className="row justify-content-center">
                    <div className="col-md-12 shadow-lg profile-image-col">
                        <div className="text-center">
                            <img src={user.profile_url} className="img-fluid shadow-lg avatar-profile-image border rounded border-white" width="175" height="64" />
                        </div>
                        <h4 className="text-center font-weight-light mt-3">{user.username}</h4>
                        <div className="row justify-content-around mt-5 border py-3 bg-light">
                            <NavLink className="btn border mb-3 rounded-pill profile-button-hover my-auto shadow-sm" exact to="/new">Write a Blog</NavLink>
                            <NavLink className="btn border mb-3 rounded-pill profile-button-hover my-auto shadow-sm" exact to="/food">Search for food</NavLink>
                            <NavLink className="btn border mb-3 rounded-pill profile-button-hover my-auto shadow-sm" exact to="/food">Marvel Search</NavLink>
                        </div>
                        <Draggable
                            handle=".drag"
                            defaultPosition={{ x: 0, y: 0 }}
                            position={null}
                            grid={[5, 5]}
                            scale={1}
                            onStart={this.handleStart}
                            onDrag={this.handleDrag}
                            onStop={this.handleStop}>
                            <div className="col-4 border rounded-lg mt-3 drag bg-light">
                                <div className="">Test Card</div>
                                <div>Sample text to test the card and see if it works.</div>
                            </div>
                        </Draggable>
                        <h4 className="text-center mt-5 mb-3">My Blogs</h4>
                        <div className="row justify-content-between border mb-5 bg-light py-3 px-md-3">

                            {blogs.map(blog => (
                                <BlogCard key={`blog-${blog.id}`} blog={blog} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export interface IProfileProps { }



export default Profile;
