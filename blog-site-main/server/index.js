const express = require('express');

const mongoose = require('mongoose');
const BlogModel = require('./BlogModel');
const methodOverride = require('method-override');
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://client-eta-ten.vercel.app");
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(methodOverride('_method'))

const uri = 'mongodb+srv://venkataramankondapalli:DME17039m027@kvrblogs.0ex4e6r.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error(err));


app.put('/blogs/:slug', async (req, res) => {
  console.log(req.params.slug)
  const postId = req.params.slug;
  const updatedPostData = req.body;
  try {

    // retrieving existing data
    const existedPostData = await BlogModel.findOne({slug : postId});
    if(!existedPostData){
      return res.status(400).json({error : 'post not found'})
    }
    // updating data with user newly entered data
console.log("It works")
    existedPostData.title = updatedPostData.title;
    existedPostData.description = updatedPostData.description;
    existedPostData.markdown = updatedPostData.markdown;
    existedPostData.tags = updatedPostData.tags;

    // save  the updated blogpost back to the database 
   const blog = await existedPostData.save();

    // send a response indication the success status;
res.status(200).json(blog)

    
    
  } catch (err) {
    console.error("Error While Updating",err);
    res.status(500).send('Server Error');
  }
});

app.post('/blogs', async (req, res) => {
  try {
    console.log(req.query)
    const blog = new BlogModel({
      title: req.body.title,
      author: req.body.author,
      authorName : req.body.authorName,
      authorPhotoUrl : req.body.authorPhotoUrl,
      authorEmail:req.body.authorEmail,
      description: req.body.description,
      markdown: req.body.markdown,
      tags: req.body.tags
    });

    await blog.save();
    res.redirect(`/blogs/${blog.slug}`);
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all blog posts
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get a specific blog post by slug
app.get('/blogs/:slug', async (req, res) => {
  try {
    const blog = await BlogModel.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).send('Blog post not found');
    }
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


// get a specific blog post by id
// app.get('/blogs/:id', async (req, res) => {
//   try {
//     const blog = await BlogModel.findOne({ id: req.params.id });
//     if (!blog) {
//       return res.status(404).send('Blog post not found');
//     }
//     res.json(blog);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });
// Add a comment to a blog post
app.post('/blogs/:slug/comments', async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.slug);
    if (!blog) {
      return res.status(404).send('Blog post not found');
    }
    const comment = {
      author: req.body.author,
      content: req.body.content
    };
    blog.comments.push(comment);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//Delete a post 

app.delete('/blogs/delete/:id', async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndDelete(req.params.id);
    console.log(req.params.id);

    res.status(200).json(blog);

  } catch (e) {
    res.status(500);

  }
})

app.get('/', async (req, res) => {
  try {
    const { title } = req.query;
    const blogs = await BlogModel.find({ title: new RegExp(title, 'i') });

    res.status(200).json(blogs);
  } catch (e) {
    res.status(500);
  }
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


