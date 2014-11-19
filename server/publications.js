Meteor.publishComposite("items", function() {
  return {
    find: function() {
      return Items.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  };
});

Meteor.publishComposite("someProducts", function(max) {
  return {
    find: function() {
      return Products.find({},{sort: {createdAt: -1}, limit: max});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  };
});

Meteor.publishComposite("allProducts", function() {
  return {
    find: function() {
      return Products.find();
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  };
});

Meteor.publish('productDetails', function(productId) {
  return Products.find(productId);
});
