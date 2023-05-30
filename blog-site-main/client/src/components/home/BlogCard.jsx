import React from 'react'
import './blogCard.css'
//import '../postblog/PostBlog'

//import PostBlog from '../postblog/PostBlog';


function BlogCard(props) {

  async function deleteBlog(id) {
    
    fetch(`${process.env.REACT_APP_BASE_URL}blogs/delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.status === 200) {
          console.log("deleted") 
          refreshPage();
        } else {
          console.log('Blog post deleted successfully!');

        }
      })
      .catch(error => {
        console.error('Error while deleting blog post:', error);
      });
  }

  const editBlog = (id) =>{
    window.open(`/blogs/edit/${id}`)
  };
   


  
   
  

  const refreshPage = () => {
    window.location.reload();
  }


  function extractImage() 
  {
    // Parse the HTML string into a Document object
    const parser = new DOMParser();
    const doc = parser.parseFromString(props.data.sanatizedHtml, 'text/html');

    // Select the first image element in the document
    const img = doc.querySelector('img');
    // return img;

    return img=== null ? "https://www.w3schools.com/w3css/img_snowtops.jpg" : img.src;

  }

  const url = extractImage();
  
  return (
    <div class="card" key={props.data._id}

    >

      <img src={ url} alt="Avatar" style={{ width: "100%" }} />
      <div class="container"

      >
        <div className='blogcard__content'
          onClick={() => window.open(`/blogs/${props.data.slug}`, "_self")}
        >
          <h4><b>{props.data.title}</b></h4>
          <p>{props.data.description}</p>
        </div>
      </div>

      <i class='bx bx-trash blogcard__delete' onClick={() => deleteBlog(props.data._id)}></i>
     
      <i class="bx bx-edit blogcard__edit" onClick={() => editBlog(props.data.slug) }></i>
    </div>

  );

}

export default BlogCard