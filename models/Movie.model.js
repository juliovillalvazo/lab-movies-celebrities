const { Schema, model } = require('mongoose');

const moviesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    plot: {
        type: String,
        required: true,
    },
    cast: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }],
    },
});

module.exports = model('Movie', moviesSchema);
