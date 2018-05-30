let NormalizeValues = (values) => {
    let newValues       = {};
    let valuesToSet     = {};
    let valuesToUnset   = {};

    Object.keys(values).forEach((key) => {
        const value = values[key];
        if (value == null) {
            valuesToUnset[key] = 1;
        } else {
            valuesToSet[key] = value;
        }
    });

    if (Object.keys(valuesToSet).length > 0) {
        newValues.$set = valuesToSet;
    }
    if (Object.keys(valuesToUnset).length > 0) {
        newValues.$unset = valuesToUnset;
    }

    return newValues;
};

let UpdateAudit = (values) => {
    if (Object.keys(values).indexOf("$set") === -1) {
        values.$set = {};
    }
    values.$set["lastModified"] = Date.now();
    return values;
};

let UpdateVersion = (values) => {
    if (Object.keys(values).indexOf("$inc") === -1) {
        values.$inc = {};
    }
    values.$inc["__v"] = 1;
    return values;
};

let MongoUtils = {
    normalizeValues : NormalizeValues,
    updateAudit     : UpdateAudit,
    updateVersion   : UpdateVersion,
};

module.exports = MongoUtils;