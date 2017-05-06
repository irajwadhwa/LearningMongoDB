const mongoose = require('mongoose');
const PostSchema= require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true,'Name is a mandatory field'],
    validate: {
      validator : (val) => val.length >= 3,
      message : 'Name must be longer than two characters'
    }
  },
  //postCount: Number, -- Removing it from here and adding it as a Virtual Field
  posts: [PostSchema],
  likes: Number,
  blogPosts:[{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function(){
  return this.posts.length;
});

UserSchema.pre('remove',function(next){
  const BlogPost=mongoose.model('blogPost');
  //BlogPost.remove({_id:{$in: this.blogPosts}})
  BlogPost.remove(
    {
      _id:{
            $in: this.blogPosts
          }
    }
  )
  .then(()=>next());
  //next(); If needed, it tells mongoose to call the next middleware functions.
});

const User = mongoose.model('allusers',UserSchema); //Where user is the name of the Collection in MongoDB
//User variable above defines all the users in the collection 'user'

module.exports = User;
