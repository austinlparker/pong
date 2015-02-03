var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
    date: String,
    winner: String,
    loser: String,
    winScore: Number,
    loseScore: Number
});

mongoose.model('Game', GameSchema);