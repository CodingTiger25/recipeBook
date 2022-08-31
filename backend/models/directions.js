const mongoose = require('mongoose');


const directionsSchema = new mongoose.Schema({

    steps: [
        {     
        _id: Number,
        type: String
        }
    ]
})

const theSteps = mongoose.model('thesteps', directionsSchema);

module.exports = theSteps;