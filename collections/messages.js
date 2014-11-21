Messages = new Mongo.Collection('messages');

Schemas={};

Schemas.Message = new SimpleSchema({

    createdBy: {
        type: String,
        optional: false
    },

    value: {
        type: String,
        optional: false
    },

    productId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id

    },

    createdAt: {
      type: Date,
        autoValue: function() {
          if (this.isInsert) {
            return new Date;
          } else if (this.isUpsert) {
            return {$setOnInsert: new Date};
          } else {
            this.unset();
          }
        }
    }
});

Messages.attachSchema(Schemas.Message);
