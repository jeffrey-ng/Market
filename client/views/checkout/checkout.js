Template.checkout.helpers({
    cart: function(){
    return Carts.findOne({_id: Session.get('carts')});
    },

    products: function () {
        return Carts.findOne({_id: Session.get('carts')}).products;
    },

    total: function () {
        var total = 0.0;
        _.each(Carts.findOne({_id: Session.get('carts')}).products, function (product) {
            total += product.price * product.quantity;
        });
        return total;
    }

});

Template.checkout.events({
    'click #updateCart': function(e, t) {
        e.preventDefault();
        var newQuantity = t.find('#updateQuantity_' + this._id).value;
        if (parseInt(newQuantity) <= 0) {
            Meteor.call('updateRemoveProductCart', Session.get('carts'), this._id);
        } else {
            Meteor.call('updateQuantityProductCart', Session.get('carts'), this._id, newQuantity);
        }
    },
    'click #clearCart': function(e, t){
        e.preventDefault();
        var cart = Session.get('carts');
        Meteor.call('removeCart', cart);
        Session.set('carts', null);
    },

    'click #removeProduct': function (e, t) {
        e.preventDefault();
        var cart = Session.get('carts');
        Meteor.call('updateRemoveProductCart', cart, this._id);
    }

});

Template.payment.events({
 'click button': function(e) {
        e.preventDefault();

        StripeCheckout.open({
            key: 'pk_test_rcY2XmBWLtDSLwUJggmP4OVU',
            amount: 20,
            name: 'The Store',
            description: 'A whole bag of awesome ($50.00)',
            panelLabel: 'Pay Now',
            token: function(res) {
                // Do something with res.id
                // Store it in Mongo and/or create a charge on the server-side
                console.info(res);
            }
        });
    },

     'click #stripePayment': function(e) {
        e.preventDefault();

         StripeCheckout.open({
            key: 'pk_test_rcY2XmBWLtDSLwUJggmP4OVU',
            amount: 20,
            name: 'The market',
            description: ' Items',
            panelLabel: 'Pay Now',
             token: function(res) {
                // Do something with res.id
                // Store it in Mongo and/or create a charge on the server-side
                console.info(res);
            }
        });
    }
})
