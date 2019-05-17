const express = require('express');
const Router = express.Router();

//model
const Posts = require('../models/Posts');

//home
Router.get('/',(req,res)=>{
    Posts.find()
        .sort({data: -1})
        .then(posts => {
            res.json(posts);
        })
        .catch(err => console.log(`post get error`));
})

//search post
Router.get('/:id',(req,res)=>{
    Posts.findById(req.params.id)
        .then(post => {
            res.json(post);
        })
        .catch(err => console.log('post search error'));
})

//add post
Router.post('/add',(req,res)=>{
    let post = new Posts({
        title:req.body.title,
        author:req.body.author,
        body:req.body.body
    })

    post.save()
        .then(post => {
            res.json(post);
        })
        .catch(err => console.log('post insert error'));
})

Router.put('/update',(req,res)=>{
    let id = req.body._id;

    let post = {
        title:req.body.title,
        author:req.body.author,
        body:req.body.body
    }
    Posts.updateOne(id,post)
        .then(post => {
            res.send(post);
        })
        .catch(err => console.log('post update error'));
    
})

//delete post
Router.delete('/delete/:id',(req,res)=>{
    let id = {_id:req.params.id};

    Posts.deleteOne(id)
        .then(post => {
            res.json(post);
        })
        .catch(err => console.log('post delete error'));
})






module.exports = Router;