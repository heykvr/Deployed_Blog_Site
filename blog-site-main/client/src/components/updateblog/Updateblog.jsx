// EditPostComponent.js
import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';

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



function Updateblog() {

    const {slug} = useParams();
    const [user, setUser] = useState(false);
//1 ue
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setUser(data);
        });


        return () => {
            unsubscribe();

        };
    }, []);
    
//2 ue
    useEffect(()=>{
        fetchData();

    },[])
    const [isLoading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');
    const [markdown, setSetMarkdown] = useState('');
    const [tags, setTags] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}blogs/${slug}`,{method : "GET"});
            const responseData = await response.json();
            
            //console.log(responseData)
            setLoading(false);
            setTitle(responseData.title)
            setDescription(responseData.description)
            setSetMarkdown(responseData.markdown)
            setTags(responseData.tags)


            // console.log(responseData);
        } catch (e) {
            console.log(e);

        }
    }

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
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}blogs/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsondata)
            });
            
                console.log('Blog post updated successfully');
                const resData = await response.json();
               window.open(`/blogs/${resData.slug}`,'_self')
            //  else {
            //     console.log('Error creating blog post');
                setLoading(false);
                
            
        } catch (error) {

            console.error('Error:', error);
            setLoading(false);
            alertError(error);

        }

    }

    function alertError(error) {
        alert("Error while submiting, change title or add all fields " + error);
    }



    



    

  return (

    !user ? <button onClick={() => loginHandler()}>SignIn</button> :

            isLoading ? <Loader /> :  
    <div>
      <Header />
      <form onSubmit={(data) => submitHandler(data)}
                        className='container form__container'>

                        <User user={user} logoutHandler={logoutHandler}showlogout={true} />

                        <div className="input blog__title">
                            <label htmlFor='title'>Title</label>
                            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>



                        <div className="input blog__description">

                            <label htmlFor='description'>description</label>
                            <input type="text" name="description" id="description"
                               value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="input blog__markdown">

                            <label htmlFor='markdown'>markdown</label>
                            <textarea

                                cols="30" rows="10"
                                type="" name="markdown" id="markdown"
                                
                                onChange={(e) => setSetMarkdown(e.target.value)}

                                value={markdown}
                            />
                        </div>

                        <div className="input blog__tags">

                            <label htmlFor='tags'>tags</label>
                            <input type="text" name="tags" id="tags"
                            value={tags}
                                onChange={(e) => {
                                    let data = e.target.value.split(',')
                                    setTags(data);


                                }}
                                placeholder={`Comma ',' seperated`}
                            />
                        </div>
                        <button className='blog__submit' >Submit</button>

                    </form>
    </div>
  )
}

export default Updateblog

