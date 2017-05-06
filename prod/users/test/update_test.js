"use strict";

const assert= require("assert");
const User= require("../src/user");

describe('Updating records',()=>{

  let raj;

  beforeEach((done)=>{
    raj=new User({name:"Raj",likes:2});
    raj.save()
        .then(()=>done());
  });

  function assertName(operation,done){
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Sachin');
        done();
      });
  }

  it('Instance Updates using set and save', (done)=>{
    //console.log(raj);
    raj.set('name','Sachin');
    //console.log(raj);
    assertName(raj.save(),done);
  });



  it('A model instance can update',(done)=> {
    assertName(raj.update({'name':'Sachin'}),done);
  });

  it('Model can update',(done)=> {
    assertName(
      User.update({name: 'Raj'},{name:'Sachin'}),
      done
    );
  });

  it('Model class can update one Record',(done)=> {
    assertName(
      User.findOneAndUpdate({name:'Raj'},{name:'Sachin'})
      ,done
    );
  });

  it('Model class can update a specific record with ID',(done)=> {
    assertName(
      User.findByIdAndUpdate(raj._id,{name:"Sachin"})
      ,done
    );
  });

  it('A user can have their PostCount incremented by 1',(done)=> {
    User.update({name:'Raj'} , { $inc: { likes:10 } })
        .then(()=>User.findOne({name:'Raj'}))
        .then((user)=>{
          assert(user.likes===12);
        });
        done();
  });
});
