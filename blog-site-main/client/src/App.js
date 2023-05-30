import './index.css';
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Home from './components/home/Home';
import Blog from './components/blog/Blog';
import PostBlog from './components/postblog/PostBlog';
import BlogSearch from './components/search/BlogSearch';
import Updateblog from './components/updateblog/Updateblog'




const router = createBrowserRouter([

  {
    path: "/blogs",
    element: <Home/>
  },
  {
    path:"blogs/:slug",
    element: <Blog />
  },
  {
    
    path:"blogs/post",
    element: <PostBlog />
   
  },
  {
    path:"blogs/edit/:slug",
    
    element: <Updateblog />,
    props : true
  },
  
  {
    path:"blogs/search",
    element: <BlogSearch />
   
  }
]);

function App() {
  return (
    <RouterProvider router = {router}  /> 
  );
}
export default App;