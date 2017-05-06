"use strict";
const assert=require('assert');
const User= require("../src/user");

describe('Reading users out of the DB',()=>{
  let raj,ankur,abhi,harsh;

  beforeEach((done)=>{
    raj=new User({name: 'Raj'});
    ankur=new User({name: 'Ankur'});
    abhi=new User({name: 'Abhi'});
    harsh=new User({name: 'Harsh'});

    Promise.all([
      raj.save(),
      ankur.save(),
      abhi.save(),
      harsh.save()
    ])
    .then(()=> done());
  });

  it('Finds all the users with the name raj',(done)=>{
    User.find({name:'Raj'})
        .then((users)=>{
          //console.log(users[0]._id);
          //console.log(raj._id);
          assert(users[0]._id.toString() === raj._id.toString());
          done();
        });
  });

  it('Find a user with a particular ID', (done)=>{
    User.findOne({_id:raj._id})
    .then((user)=>{
      assert(user.name === 'Raj');
      done();
    });
  });

  it('Can skip and limit the result set', (done)=>{
    User.find({})
        .sort({name:1})
        .skip(1)
        .limit(2)
        .then((users)=>{
          console.log(users[0].name);
          console.log(users[1].name);
          assert.equal(users[0].name,'Ankur');
          assert.equal(users[1].name,'Harsh');
          assert(users.length === 2);
          done();
        })
  });
});
