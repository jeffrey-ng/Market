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
