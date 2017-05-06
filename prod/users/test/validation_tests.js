"use strict";

const assert= require("assert");
const User= require("../src/user");


describe('Validation records',()=>{
  it('Requires a User name',(done)=>{
    const user=new User({name: undefined});
    const validationResult= user.validateSync();
    const message=validationResult.errors.name.message;
    assert.equal(message,'Name is a mandatory field');
    done();
  });

  it('Requires a Username longer than 2 Characters',()=>{
    const user=new User({name: 'Ra'});
    const validationResult= user.validateSync();
    const message=validationResult.errors.name.message;
    //console.log(validationResult.errors.name.message+" : "+user);
    assert.equal(message.toString(),'Name must be longer than two characters');
    //done();
  });
});
