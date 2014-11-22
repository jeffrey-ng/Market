Products = new Mongo.Collection('products');
// GroundDB(Products);


Schemas = {};

Schemas.Product = new SimpleSchema({

    // _id: {
    //     type: String,
    //     regEx: SimpleSchema.RegEx.Id
    // },

    name: {
      type: String,
      optional:false
    },

    description: {
      type: String,
      optional:false
    },

    price: {
      type: Number,
      min: 0,
      decimal: true,
      label: 'Price'
    },

    quantity: {
      type: Number,
      min: 0,
      label: 'Quantity'
    },

    pic: {
      type: String,
      optional: true
    },

    createdBy: {
      type: String,
      optional: true //For now
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

Products.attachSchema(Schemas.Product);
Products.initEasySearch('name');
