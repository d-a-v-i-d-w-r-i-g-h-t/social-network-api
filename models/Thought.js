const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/formatDate');

// Schema to create User model
const thoughtSchema = new Schema(
  {
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
      get: formatDate,
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
      getters: true,
    },
    id: false,
  }
  );

  // virtual reactionCount that retrieves the length of the user's reaction array field
  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });  

const Thought = model('thought', thoughtSchema);

module.exports = Thought;