import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../util/Loader';
import Header from '../Header/Header';
import BlogCard from '../home/BlogCard';

function BlogSearch() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setLoading] = useState(true);
    // const [isLoading ,setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("title")

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}?title=${query}`);
            const responseData = await response.json();
            setBlogs(responseData);
            console.log(responseData)
            setLoading(false);

            // console.log(responseData);
        } catch (e) {
            console.log(e);

        }
    }
    return (
        <div>

            <Header title={query} />
            <div className="home__blogs">

                {

                    isLoading ? <Loader /> :
                        blogs.length === 0 ? <h1>No blogs found</h1>
                            :

                            blogs.map((blog, index) =>
                                <BlogCard data={blog} index={index} />
                            )


                }
            </div>
        </div>
    )
}

export default BlogSearch;
