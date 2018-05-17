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
    admins: [{
        type: ObjectId,
        ref: 'users',
        required: true,
    }],
    users: [{
        type: ObjectId,
        ref: 'users',
        required: false,
    }],
});

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