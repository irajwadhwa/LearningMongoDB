"use strict";

const assert= require("assert");
const User= require("../src/user");

describe('subdocuments',()=>{
  let raj;

  beforeEach((done)=>{
      raj=new User({
        name: 'Raj',
        posts:[
          {title:'My First Post'}
        ]
      });
      console.log(raj);
      raj.save()
          .then(()=>done());
  });

  it('Can create subdocuments',(done)=>{
      User.findOne({_id:raj._id})
          .then((user) => {
            assert.equal(user.posts[0].title,'My First Post',"Posts Wasn't properly saved");
            done();
      });
  });

  it('can add subdocuments to an existing record', (done)=>{
    User.findOne({_id:raj._id})
        .then((user)=>{
          user.posts.push({title: 'My Second Post'});
          return user.save();
        })
        .then(()=>User.findOne({_id:raj._id}))
        .then((user)=>{
          console.log(user);
          assert.equal(user.posts[1].title,'My Second Post',"Posts Wasn't properly saved");
          done();
        });
  });

  it('can remove an existing subdocuments', (done)=>{
    User.findOne({_id:raj._id})
        .then((user)=>{
          const post=user.posts[0]
          post.remove();
          return user.save();
        })
        .then(()=>User.findOne({_id:raj._id}))
        .then((user)=>{
          console.log(user);
          assert(user.posts.length === 0);
          done();
        });
  });
});
