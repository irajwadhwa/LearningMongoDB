"use strict";

const assert= require("assert");
const User= require("../src/user");

describe('Virtual Types', ()=>{
  let raj;

  beforeEach((done)=>{
      raj=new User({
        name: 'Raj',
        posts:[
          {title:'My First Post'},
          {title:'My Second Post'}
        ]
      });
      console.log(raj);
      raj.save()
          .then(()=>done());
  });

  it('postCount returns number of posts', (done)=>{
    User.findOne({_id:raj._id})
        .then((user) => {
          assert(user.postCount === 2);
          done();
        })

  })
})
