var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

var loremIpsum = require('lorem-ipsum'),
    output = loremIpsum({
        count: 1 // Number of words, sentences, or paragraphs to generate.
            ,
        units: 'words' // Generate words, sentences, or paragraphs.
            ,
        format: 'plain' // Plain text or html
            ,
        random: Math.random // A PRNG function. Uses Math.random by default
    });

console.log(output);

router.get('/comments', function(req, res, next) {
    console.log("In GET route");
    Comment.find(function(err, comments) {
        if (err) { return next(err); }
        res.json(comments);
    });
});

router.post('/comments', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function(err, comment) {
        if (err) { return next(err); }
        res.json(comment);
    });
});

router.param('comment', function(req, res, next, id) {
    Comment.findById(id, function(err, comment) {
        if (err) { return next(err); }
        if (!comment) { return next(new Error("can't find comment")); }
        req.comment = comment;
        return next();
    });
});

router.get('/comments/:comment', function(req, res) {
    res.json(req.comment);
});

router.put('/comments/:comment/upvote', function(req, res, next) {
    console.log("index.js upvote route.put");
    req.comment.upvote(function(err, comment) {
        if (err) { return next(err); }
        console.log("index.js upvote route.put WORKED");
        res.json(comment);
    });
});

router.put('/comments/:comment/downvote', function(req, res, next) {
    console.log("index.js downvote route.put");
    req.comment.downvote(function(err, comment) {
        if (err) { return next(err); }
        console.log("index.js downvote route.put WORKED");
        res.json(comment);
    });
});

router.delete('/comments/:comment', function(req, res) {
    console.log("in Delete");
    req.comment.remove();
    res.sendStatus(200);
});

module.exports = router;
