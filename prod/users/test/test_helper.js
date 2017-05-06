"use strict";

const mongoose = require('mongoose'); //constt keyword is ES6 identifier
mongoose.Promise= global.Promise; //This will use the ES6 Promise Implementation

before((done)=>{
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open',() => {
      console.log('Good to go!');
      done();
    })
    .on('error', (error) => {
      console.warn('Warning',error);
    });
});

beforeEach((done) => {
  const allCollections=mongoose.connection.collections;
  allCollections.allusers.drop(() => {
    //Ready to run the next test!
    allCollections.blogposts.drop(() =>{
      allCollections.comments.drop(()=>{
        done();
      });
    });
  });
});
