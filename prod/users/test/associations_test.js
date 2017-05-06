"use strict";

const assert= require("assert");
const mongoose=require('mongoose');
const User=require('../src/user');
const Comment=require('../src/comment');
const BlogPost=require('../src/blogPost');

describe('Association', ()=> {
  let raj,blogpost,comment;

  beforeEach((done) => {
    raj=new User({name:'Raj'});
    blogpost=new BlogPost({title:'MongoDB Tutorials', contet:'Start with this'});
    comment=new Comment({content:'Congrats on Great Post'});

    comment.user=raj;
    blogpost.comments.push(comment);
    raj.blogPosts.push(blogpost);

    Promise.all([
        raj.save(),
        blogpost.save(),
        comment.save()])
        .then(()=> done());
  });

  it('saves a relation between a user and a blogpost', (done)=>{
    User.findOne({_id:raj._id})
        .populate('blogPosts')
        .then((user)=>{
          //console.log(user);
          assert.equal(user.blogPosts[0].title,'MongoDB Tutorials','Title was not saved properly');
          done();
        });
  });

  it('saves a full relation object graph', (done)=>{
    User.findOne({_id:raj._id})
        .populate({
          path:'blogPosts',
          populate: {
            path:'comments',
            model: 'comments',
            populate: {
              path: 'user',
              model: 'allusers'
            }
          }
        })
        .then((user)=>{
          //console.log(user.blogPosts[0].comments[0].user.name);
          assert.equal(user.blogPosts[0].comments[0].user.name,'Raj','Name was not correct');
          assert.equal(user.blogPosts[0].comments[0].content,'Congrats on Great Post','Comment Content was not saved Properly');
          done();
        });
  });
});
