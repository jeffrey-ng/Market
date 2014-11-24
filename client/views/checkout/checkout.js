
Template.checkout.helpers({
    cart: function(){
    return Carts.findOne({_id: Session.get('carts')});
    },

    products: function () {
        return Carts.findOne({_id: Session.get('carts')}).products;
    },

    total: function () {
        var total = 0.0;
        var count =0;
        _.each(Carts.findOne({_id: Session.get('carts')}).products, function (product) {
            total += product.price * product.quantity;
            count +=1;
        });
        Session.set('checkoutTotal',total);
        Session.set('checkoutItemCount', count);
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
 'click #stripe': function(e,t) {
        e.preventDefault();
        StripeCheckout.open({
            key: 'pk_test_rcY2XmBWLtDSLwUJggmP4OVU',
            amount: Session.get('checkoutTotal') * 100,
            name: 'The Store',
            description: Session.get('checkoutItemCount') + ' Items',
            panelLabel: 'Pay Now',
            token: function(res) {
                // Do something with res.id
                // Store it in Mongo and/or create a charge on the server-side
                console.info(res);
            }
        });
    },

    'click #demo': function(e,t) {
     e.preventDefault();
     var cart = Carts.findOne({_id: Session.get('carts')});

        Meteor.call('newOrder', Meteor.userId(),cart.products, function( error, result) {
            if (error) {
                Errors.throw(error.message);
            }
            var cartId = Session.get('carts');
            Meteor.call('removeCart', cartId);
            Session.set('carts', null);
            Router.go('showOrder',{_id: result});
        });
    }

});
