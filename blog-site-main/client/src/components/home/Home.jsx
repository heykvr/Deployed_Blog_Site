import './home.css'
import Header from '../Header/Header'
import React, { useState, useEffect } from 'react'
import Loader from '../util/Loader'
import BlogCard from './BlogCard';


const url = process.env.REACT_APP_BASE_URL;

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log(url);
    fetchData();
  }, []);

  async function fetchData() {
    try {

      const response = await fetch(url);
      const responseData = await response.json();
      setBlogs(responseData);
      setLoading(false);

      // console.log(responseData);
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
            blogs.map((blog, index) =>
              <BlogCard data={blog}  index={index}/>
            )

        }
      </div>
    </div>
  )
}

export default Home
