import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import Navbah from '../components/Navbah';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import 'github-markdown-css'
import apiServices from '../utils/api-services';
import { ITags } from '../utils/interfaces';

const NewBlog: React.FC<NewBlogProps> = props => {
    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    const [content, setContent] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [image_url, setImage_url] = useState<string>('')
    const [newTag, setNewTag] = useState('0');
    const [tags, setTags] = useState<ITags[]>([]);


    const history = useHistory();

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

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await apiServices('/api/blogs', 'POST', { title, content, tagid: newTag, image_url })
            history.push('/blog');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="container">
            <Helmet>
                <title>{navbarText}</title>
            </Helmet>

            <Navbah />
            <h2 className="text-center my-4 text-muted">{navbarText}</h2>

            <section className="row mt-5 justify-content-center">
                <div className="col-md-12">
                    <form className="form-group p-3 rounded border-0 shadow bg-light">
                        <div className="col-10 mx-auto">
                            <input className="form-control mb-5 border-primary border-top-0 border-left-0 border-right-0 bg-light rounded-0"
                                type="text"
                                placeholder="Enter title ..."
                                value={title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            />
                            <input className="form-control mb-5 border-primary border-top-0 border-left-0 border-right-0 bg-light rounded-0"
                                type="text" placeholder="Enter image URL ..."
                                value={image_url}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage_url(e.target.value)}
                            />
                            <select className="form-control"
                                value={newTag}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewTag(e.target.value)}>
                                <option value="0" disabled>Choose a tag ...</option>
                                {tags.map(tag => (
                                    <option key={tag.id} value={tag.id}>{tag.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="row form-group mt-5">
                            <div className="col-md-6">
                                <textarea className="form-control shadow" rows={12} placeholder="Enter text ..."
                                    value={content}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="col-md-6 d-none d-sm-block d-print-block">
                                <div className="card shadow overflow-auto" style={{ minHeight: '302px' }}>
                                    <div className="markdown-body">
                                        <ReactMarkdown source={content} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-md-6 text-muted text-center">
                                <small>*Markdown is supported</small>
                            </div>
                            <div className="col-md-6 text-muted text-center">
                                <small className="d-none d-sm-block d-print-block">*Markdown Preview</small>
                            </div>
                        </div>
                        <button
                            onClick={handleClick}
                            type="button"
                            className="btn btn-outline-primary btn-lg btn-block mt-3 w-75 mx-auto">Create New Blog</button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export interface NewBlogProps { }

export default NewBlog;