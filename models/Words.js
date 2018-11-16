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

mongoose.model('Word', WordSchema);





module.exports = Word;

var Word = mongoose.model('Word');

var post = new Word({title: 'Hullaballoo'});

post.defs.push({title: 'My definition'});

post.save(function (err) {
    if (!err) console.log('ASDF SUCCESS!!!');
})
