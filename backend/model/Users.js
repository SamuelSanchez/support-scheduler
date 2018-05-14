const
    mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    util        = require('util'),
    audit       = require('../utils/Audit');

let userSchema = new Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
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
    externalId: {
        type: String,
        required: false,
    },
});

// userSchema.pre('update', (next) => {
    // this.update({}, {
    //     $set: { updatedAt: new Date() },
    //     $inc: { __v: 1 },
    // });
// });

userSchema.statics.findAndModify = (query, doc, callback) => {
    console.log(this.collection);
    return this.collection.findAndModify(query, [], doc, {upsert: true}, callback);
};

userSchema
    .virtual('fullName')
    .get(() => {
        return util.format("%s %s", this.firstName, this.lastName);
    });

userSchema.plugin(audit, {
    index: true
});

module.exports = mongoose.model('users', userSchema);