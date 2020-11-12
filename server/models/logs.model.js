const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
    email: { type: String, required: true},
    description: { type: String, required: true},
    type: { type: String, required: true},
    sum: { type: Number, required: true},
    date: { type: Date, required: true},
    currency: { type: String, required: true},
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;