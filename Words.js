var mongoose = require('mongoose');

var Defs = new mongoose.Schema({
  title: String,
  votes: {type: Number, default: 0},
});

Defs.methods.upvote = function(cb) {
  this.votes += 1;
  this.save(cb);
};
Defs.methods.downvote = function(cb) {
  this.votes -= 1;
  this.save(cb);
};


var WordSchema = new mongoose.Schema({
  
  title: String,
  defs: [Defs]
});
WordSchema.methods.addDef = function(cb) {
  this.save(cb);
};

mongoose.model('Word', WordSchema);