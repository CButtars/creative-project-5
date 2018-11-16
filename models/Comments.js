var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  title: String,
  name: String,
  votes: {type: Number, default: 0},
});

CommentSchema.methods.upvote = function(cb) {
  this.votes += 1;
  this.save(cb);
};
CommentSchema.methods.downvote = function(cb) {
  this.votes -= 1;
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);