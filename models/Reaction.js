const { Schema, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

// Schema to create User model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;