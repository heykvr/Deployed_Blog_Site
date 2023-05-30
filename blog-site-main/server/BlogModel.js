// importing mongoose module to interact with mongodb
const mongoose = require('mongoose');
// slugify used to generatre a  slug based on blog title (hyphens in between in url)
const { default: slugify } = require('slugify');
// mark down syntax into html element
const {marked} = require('marked');
// marked generate html elements
// js code cleanup in html code
const createDomPurify = require('dompurify');
// provide interactivity with html elements
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window)
const Schema = mongoose.Schema;
// Define the schema for the blog site
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorName :{
    type:String,
    required:true 
  },
  authorPhotoUrl :{
    type:String,
    required:true 
  },
  authorEmail :{
    type:String,
    required:true 
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  tags: {
    type: [String]
  },
  sanatizedHtml: {
    type: String,
    required: true
  },
  comments: [{
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }]
});
BlogSchema.pre('validate', function (next) {
  if (this.title) {

    this.slug = slugify(this.title, { lower: true, strict: true })

  }
  if (this.markdown) {

    this.sanatizedHtml = dompurify.sanitize(marked.parse(this.markdown));
    
  }
  next();
});


// Create a model for the schema
const BlogModel = mongoose.model('Blog', BlogSchema);



module.exports = BlogModel;