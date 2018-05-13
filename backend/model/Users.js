const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require('util');

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

/*
    Add Audit trail and increase versioning
    TODO: Need to add field 'modifiedBy' once authentication is added
 */
userSchema.pre('save', (next) => {
    // console.log(this);
    // if (this.isNew) {
    //     this['createdAt'] = Date.now();
    // }
    // this['lastUpdatedTime'] = Date.now();
    // this.update({}, { $inc: { __v: 1 } }, next);
    return next();
});

// userSchema.pre('update', (next) => {
//     this.update({}, { $inc: { __v: 1 } }, next);
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

module.exports = mongoose.model('users', userSchema);