var mongoose  = require('mongoose');
var blogPost = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
});

var blog = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    postList: [blogPost]
});

mongoose.model('blog', blogSchema);

module.exports = blog;



var Blog = mongoose.model('blog');

// create a blog post
var theBlog = new Blog();

// create a comment
theBlog.postList.push({ title: 'My comment' });

theBlog.postList.save(function (err) {
  if (!err) console.log('Success!');
});