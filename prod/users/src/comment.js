const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema= new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'allusers'
  }
});

const Comment=mongoose.model('comments', commentSchema);
module.exports=Comment;
