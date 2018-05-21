const
    mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    util        = require('util'),
    audit       = require('../utils/Audit'),
    MongoUtil   = require('../utils/MongoUtil');

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

userSchema.statics.findAndModify = function (query, doc, callback) {
    let options = {
        new: true,
        upsert: false,
        passRawResult: false,
        runValidators: true,
    };
    let normalizeValues = MongoUtil.updateAudit(MongoUtil.normalizeValues(doc));
    return this.findOneAndUpdate(query, normalizeValues, options, callback);
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