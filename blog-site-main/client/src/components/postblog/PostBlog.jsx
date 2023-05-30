import React, { useState, useEffect } from 'react'
import './postblog.css'
import Loader from '../util/Loader';
import Header from '../Header/Header'

import { app } from "../../firebase";
import {
    onAuthStateChanged,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
 
import User from '../User';

const auth = getAuth(app); 

const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
};

const logoutHandler = () => signOut(auth);


function PostBlog() {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setUser(data);
        });


        return () => {
            unsubscribe();

        };
    }, []);



    const [isLoading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');
    const [markdown, setSetMarkdown] = useState('');
    const [tags, setTags] = useState([]);

    async function submitHandler(data) {
        setLoading(true);
        data.preventDefault();
        const jsondata = {
            title: title,
            author: user.uid,
            authorName: user.displayName,
            authorPhotoUrl: user.photoURL,
            authorEmail: user.email,
            description: description, 
            markdown: markdown, 
            tags: tags
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}blogs/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsondata)
            });
            if (response.ok) {

                console.log('Blog post created successfully');
                const resData = await response.json();
                window.open(`/blogs/${resData.slug}`,'_self')
            } else {
                console.log('Error creating blog post');
                setLoading(false);
                alertError();


            }
        } catch (error) {

            console.error('Error:', error);
            setLoading(false);
            alertError();

        }

    }

    function alertError() {
        alert("Error while submiting, change title or add all fields");
    }
    console.log(user);
    return (

        !user ? <button onClick={() => loginHandler()}>SignIn</button> :

            isLoading ? <Loader /> :
                <>
                    <Header />

                    <form onSubmit={(data) => submitHandler(data)}
                        className='container form__container'>

                        <User user={user} logoutHandler={logoutHandler}showlogout={true} />

                        <div className="input blog__title">
                            <label htmlFor='title'>Title</label>
                            <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} />
                        </div>



                        <div className="input blog__description">

                            <label htmlFor='description'>description</label>
                            <input type="text" name="description" id="description"

                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="input blog__markdown">

                            <label htmlFor='markdown'>markdown</label>
                            <textarea

                                cols="30" rows="10"
                                type="" name="markdown" id="markdown"
                                onChange={(e) => setSetMarkdown(e.target.value)}
                            />
                        </div>

                        <div className="input blog__tags">

                            <label htmlFor='tags'>tags</label>
                            <input type="text" name="tags" id="tags"
                                onChange={(e) => {
                                    let data = e.target.value.split(',')
                                    setTags(data);


                                }}
                                placeholder={`Comma ',' seperated`}
                            />
                        </div>
                        <button className='blog__submit' >Submit</button>

                    </form>

                </>
    )
}

export default PostBlog