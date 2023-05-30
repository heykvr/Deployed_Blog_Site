import './header.css';

import React, { useState } from 'react'

function Header(props) {
  const [title, setTitle] = useState(props.title);


  return (
    <header className="container">
      <nav className="nav__bar">
        <h1 className="nav__title"> <a href={`/blogs`}>My Blogs</a></h1>
        <div className="search__bar">

          <input type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title} placeholder={'Search here'} />

          <i class='bx bx-search' onClick={() => window.open(`/blogs/search?title=${title}`, "_self")}></i>

        </div>

        <ul className="nav__links">
          <li className="nav__link active"><a href={`/blogs`}>Home</a></li>
          <li className="nav__link"><a href={`/blogs/post`}>Post</a></li>
        </ul>
      </nav>
    </header>
  )
}


export default Header

