let Audit = (schema, options) => {
    schema.add({
        createdAt   : Date,
        lastModified: Date,
        // modifiedBy  : String,
    });

    /**
     *  Audit adjustments
     */
    schema.pre('save', function (next) {
        if (this.isNew) {
            this.createdAt = Date.now();
        }
        this.lastModified = Date.now();
        next();
    });

    schema.pre('update', function (next) {
        this.lastModified = Date.now();
        next();
    });

    if (options && options.index) {
        schema.path('lastModified').index(options.index);
    }
};

module.exports = Audit;