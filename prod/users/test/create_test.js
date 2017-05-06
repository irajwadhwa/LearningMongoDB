const assert = require('assert');
const User = require('../src/user');

describe('Creating Records', () => {

  it('Saves a user', (done) => {
    const user_raj = new User({name: 'Raj'});
    user_raj.save()
            .then(()=>{
              // Has this user saved in Database.
              assert(!user_raj.isNew);
              done();
            });
  });
});
