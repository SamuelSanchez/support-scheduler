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
    owner: {
        type: String,
        required: true,
        trim: true,
    },
    users: [ {
        type: ObjectId,
        ref: 'users',
        required: false,
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

//  Increase the version on updates
groupSchema.pre('save', (next) => {
    //  TODO: need to increment on 'save' as well!
    //this.increment();
    return next();
});

groupSchema.pre('update', (next) => {
    this.update({}, { $inc: { __v: 1 } }, next);
});

//  Custom functions
groupSchema.static.findByName = (name, callback) => {
    return this.find({name: name}, callback);
};

groupSchema.static.findByOwner = (owner, callback) => {
    return this.find({owner: owner}, callback);
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