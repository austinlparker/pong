var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    firstName: String,
    lastName: String,
    wins: Number,
    losses: Number,
    img: {
        path: String,
        contentType: String
    }
});

PlayerSchema.virtual('winpercentage')
    .get(function(){
        if (this.losses === 0) {
            return "100%"
        }
        return (String)(this.wins/this.losses);
    });

mongoose.model('Player', PlayerSchema);