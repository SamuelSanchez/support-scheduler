const
    mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    ObjectId    = Schema.Types.ObjectId,
    audit       = require('../utils/Audit');

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

groupSchema.plugin(audit, {
    index: true
});

module.exports = mongoose.model('groups', groupSchema);