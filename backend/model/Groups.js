const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

let groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    admin: {
        type: String,
        required: true,
        trim: true,
    },
    users: [ {
        type: ObjectId,
        ref: 'users',
        required: false,
    }],
});

/*
    Add Audit trail and increase versioning
    TODO: Need to add field 'modifiedBy' once authentication is added
 */
groupSchema.pre('save', (next) => {
    // if (this.isNew) {
    //     this['createdAt'] = Date.now();
    // }
    // this['lastUpdatedTime'] = Date.now();
    // this.update({}, { $inc: { __v: 1 } }, next);
    return next();
});

// groupSchema.pre('update', (next) => {
//     this.update({}, { $inc: { __v: 1 } }, next);
// });

//  Custom functions
groupSchema.static.findByName = (name, callback) => {
    return this.find({name: name}, callback);
};

groupSchema.static.findByOwner = (owner, callback) => {
    return this.find({admin: owner}, callback);
};

groupSchema.static.findByUser = (user, callback) => {
    return this.find({users: {$in: [user]}}, callback);
};

groupSchema.statics.findAndModify = (query, doc, callback) => {
    console.log(this.collection);
    return this.collection.findAndModify(query, [], doc, {upsert: true}, callback);
};

// groupSchema.statics.findAndModify = (query, sort, doc, options, callback) => {
//     return this.collection.findAndModify(query, sort, doc, options, callback);
// };

//  Not serializable values - (transient)
groupSchema
    .virtual('size')
    .get(() => {
        return this.users.length;
    });

module.exports = mongoose.model('groups', groupSchema);