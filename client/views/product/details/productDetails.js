Meteor.methods({
    createCart: function() {
        var cartId = Carts.insert({});
        Session.set('carts', cartId);
    }
});

Template.productDetails.helpers({
    userName: function() {
        return Meteor.users.findOne({_id: this.createdBy}).profile.fullName;
    }
});

Template.productDetails.events({
    'click #cart': function() {
        var product = Products.findOne({_id: this._id});
        var productData = {_id: product._id, name: product.name, price: product.price, quantity: 1};

        var sid = Session.get('carts');
        var mycart = Carts.findOne(sid);

        if (sid==null || sid == undefined || mycart == undefined) {
            console.log("creating cart");
            Meteor.call('createCart');
        } else {
            Session.set('carts',sid);
        }

        var cart = Session.get('carts');

        if (Carts.findOne({_id: cart, 'products._id': product._id})) {
            Meteor.call('updateIncCart', cart, product._id);
        } else {
            Meteor.call('updateCart',cart,productData);
        }

        // Router go to cehckout page
        Router.go('checkout');
    }

});