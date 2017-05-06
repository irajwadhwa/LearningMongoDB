"use strict";

const assert= require("assert");
const User= require("../src/user");

describe('Deleting a User', ()=>{
  let raj;

    beforeEach((done)=>{
      raj=new User({name: "Raj"});
      raj.save()
          .then(()=>done());
    });

    it('Model instance remove',(done)=>{
      raj.remove()
          .then(()=>User.findOne({name:"Raj"}))
          .then((user)=>{
            user=== null;
          });
        done();
    });

    it('Class remove',(done)=>{
      //Remove a bunch of records with some given criteria.
      User.remove()
      .then(()=>User.findOne({name:"Raj"}))
      .then((user)=>{
        user=== null;
      });
      done();
    });

    it('Class findOneAndRemove',(done)=>{
      User.findOneAndRemove({name:"Raj"})
          .then(()=>User.findOne({name:"Raj"}))
          .then((user)=>{
            user=== null;
          });
          done();
    });

    it('Class findByIdAndRemove',(done)=>{
      User.findOneAndRemove({_id:raj._id})
          .then(()=>User.findOne({id:raj._id}))
          .then((user)=>{
            user=== null;
          });
          done();
    });
});
