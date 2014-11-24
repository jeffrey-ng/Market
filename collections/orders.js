Orders = new Mongo.Collection('orders');

Schemas={};

Schemas.Order = new SimpleSchema({
    products: {
        type: [Object],
        optional: true
    },

    'products.$._id': {
    type: String
  },

  'products.$.name': {
    type: String
  },

  'products.$.price': {
    type: Number,
    decimal: true
  },
  'products.$.quantity': {
    type: Number
  },

  userId: {
    type: String
  },

  userFullName: {
    type: String
  },

   createdAt: {
    type: Date,
    denyUpdate: true,
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

Orders.attachSchema(Schemas.Order);