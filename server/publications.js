Meteor.publishComposite("items", function () {
  return {
    find: function () {
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

Meteor.publishComposite("someProducts", function (max) {
  return {
    find: function () {
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



Meteor.publishComposite("allProducts", function () {
  return {
    find: function () {
      return Products.find({});
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

Meteor.publish('allUsers', function() {
  return Meteor.users.find({});
});

Meteor.publishComposite('productDetails', function (productId) {
  return {
    find: function () {
      return Products.find({_id: productId}, {limit: 1});
    },
    children: [{
      find: function (product) {
        return Meteor.users.find({_id: product.createdBy}, {limit: 1});
      }
    }]
  }
});

Meteor.publish('cart', function(cartId){
  if(cartId == undefined){
    return [];
  } else {
    return Carts.find({_id: cartId});
  }
});

Meteor.publish('messages', function(productId) {
  if (productId == undefined) {
    return [];
  } else {
    return Messages.find({productId: productId},{sort: {createdAt: 1}});
  }
});
