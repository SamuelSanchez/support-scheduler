const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require('util');

let userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('update', (next) => {
    this.update({}, { $inc: { __v: 1 } }, next);
});

userSchema.statics.findAndModify = (query, doc, callback) => {
    console.log(this.collection);
    return this.collection.findAndModify(query, [], doc, {upsert: true}, callback);
};

userSchema
    .virtual('fullName')
    .get(() => {
        return util.format("%s %s", this.firstName, this.lastName);
    });

module.exports = mongoose.model('users', userSchema);