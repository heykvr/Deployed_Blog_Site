import React, { useState, useEffect } from 'react'
import {  useParams } from 'react-router-dom';
import './blog.css';

import Header from '../Header/Header';
import Loader from '../util/Loader';

import * as sanitizeHtml from 'sanitize-html';
import User from '../User';

const url = process.env.REACT_APP_BASE_URL+'blogs/';

function Blog() {
  let { slug } = useParams();
  const [blog, setBlog] = useState([]);

  const [isLoading, setLoading] = useState(true);
  // const [isLoading ,setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(url + slug);
      const responseData = await response.json();

      setBlog(responseData);
      setLoading(false);

      console.log(responseData);
    } catch (e) {
      console.log(e);

    }
  }
  return (
    <div>

      <Header />
      <div className="home__blogs">

        {

          isLoading ? <Loader /> :
            <div className="blog">
              <h1 className="blog__title">{blog.title}</h1> 
              
              <p className="blog__created-time">{blog.create_at}</p>
              <div className='blog__content' dangerouslySetInnerHTML={{ __html: blog.sanatizedHtml }} />
              <div className="tags">
                <ul className="blog__tags">
                  {blog.tags.map((tagName, index) =>
                    <li className="blog__tag" key={index}>{tagName}</li>
                  )}

                </ul>
              </div>
              <div className="blog__comments">
                {blog.comments.map((comment, index) =>
                  <div className="blog__comment" key={index}>{comment}</div>
                )}
              </div>
              <div className="section blog__poster">

                <h3 className='posted__by'>Posted by</h3>
                <User user={{
                  author: "",
                  displayName: blog.authorName,
                  photoURL: blog.authorPhotoUrl,
                  email: blog.authorEmail,
                }}
                  logoutHandler={() => { }}
                  showlogout={false}
                />
              </div>
            </div>

        }
      </div>
    </div>
  )
}

export default Blog