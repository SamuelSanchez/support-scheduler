const
    mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    ObjectId    = Schema.Types.ObjectId,
    audit       = require('../utils/Audit'),
    MongoUtil   = require('../utils/MongoUtil');

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

groupSchema.statics.findAndModify = function (query, doc, callback) {
    let options = {
        new: true,
        upsert: false,
        passRawResult: false,
        runValidators: true,
    };
    let normalizeValues = MongoUtil.normalizeValues(doc);
    normalizeValues = MongoUtil.updateAudit(normalizeValues);
    normalizeValues = MongoUtil.updateVersion(normalizeValues);
    return this.findOneAndUpdate(query, normalizeValues, options, callback);
};

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