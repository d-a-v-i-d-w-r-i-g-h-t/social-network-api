const { User, Thought } = require('../models');

module.exports = {

  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select('-__v');
      ;
      res.json(thoughts);
    } catch (err) {
      res
        .status(500)
        .json(err);
    }
  },
  
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne(
        { _id: req.params.thoughtId }
      )
        .select('-__v');

        if (!thought) {
          return res
            .status(404)
            .json({ message: 'No thought with that ID' });
        }

        res.json(thought);
    } catch (err) {
      res
        .status(500)
        .json(err);
    }
  },
  
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      // update associated user's thoughts array
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Associated user not found!' });
      }

      res.json(thought);
    } catch (err) {
      return res
        .status(500)
        .json(err);
    }
  },
  
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        {runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought with this ID!' });
      }

      res.json(thought);
    } catch (err) {
      res
        .status(500)
        .json(err);
    }
  },
  
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought with this ID!' });
      }
      
      // update associated user's thoughts array
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Associated user not found!' });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      res
        .status(500)
        .json(err);
    }
  },
  
  // Create a reaction stored in a single thought's reactions array field
  async createReaction(req, res) {
    try {      
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought with this ID!' });
      }

      res.json(thought);
    } catch (err) {
      res
        .status(500)
        .json(err);
    }
  },

  // Pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought or reaction found with provided IDs!' });
      }

      res.json(thought);
    } catch (err) {
      res
        .status(500)
        .json(err);
    }
  }


}  
