Meteor.startup(function() {

  Factory.define('item', Items, {
    name: function() { return Fake.sentence(); },
    rating: function() { return _.random(1, 5); }
  });

  Factory.define('product', Products, {
    name: function() { return Fake.sentence(10);},
    price: function() { return _.random(1, 5); },
    quantity: function() { return _.random(1, 5); },
    description: function() { return Fake.sentence(10);}
  });

  if (Products.find({}).count() === 0) {
    _(10).times(function(n) {
        Factory.create('product');
      });
  }

  if (Items.find({}).count() === 0) {
    _(10).times(function(n) {
      Factory.create('item');
    });
  }

});
