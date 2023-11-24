const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;