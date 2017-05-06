"use strict";
const mongoose= require('mongoose');
const assert= require('assert');

const User=require('../src/user');
const BlogPost=require('../src/blogPost');

describe('Middleware',()=>{
  //Befor each is copied directly from association_test.js
  let raj,blogpost;//,comment;
  beforeEach((done) => {
    raj=new User({name:'Raj'});
    blogpost=new BlogPost({title:'MongoDB Tutorials', contet:'Start with this'});
    //comment=new Comment({content:'Congrats on Great Post'});

    //comment.user=raj;
    //blogpost.comments.push(comment);
    raj.blogPosts.push(blogpost);

    Promise.all([
        raj.save(),
        blogpost.save()
        //,comment.save()
      ])
        .then(()=> done());
  });

  it('Users cleanup dangling blogPosts on remove',(done)=>{
    raj.remove()
       .then(()=>BlogPost.count())
       .then((count) => {
         assert(count===0);
         done();
       })
  })
})
