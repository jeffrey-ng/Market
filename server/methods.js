Meteor.methods({
    editProfile: function(userId, fullName, website, bio) {
        Meteor.users.update(
            {_id: userId},
            {$set: {'profile.fullName': fullName, 'profile.website': website, 'profile.bio':bio}}
            );

    },
    createProduct: function(userId, productName, price, number, description) {
        console.log("inserting");
        Products.insert({
            createdBy: userId,
            name: productName,
            quantity: number,
            price: price,
            description: description
        });
    },

    createCart: function () {
        return Carts.insert({});
    },

    removeCart: function (cartId, productId) {
        Carts.remove({_id: cartId});
    },

    updateIncCart: function (cartId, productId) {
        Carts.update({_id: cartId, 'products._id': productId}, { $inc: { 'products.$.quantity': 1} });
    },

    updateCart: function(cartId, productData){
        Carts.update({_id: cartId}, { $push: { products: productData } });
    },

    updateRemoveProductCart: function (cartId, productId) {
        Carts.update({_id: cartId, 'products._id': productId}, { $pull: { products: { _id: productId } } });
    },

    updateQuantityProductCart: function(cartId, productId, newQuantity){
        Carts.update({_id: cartId, 'products._id': productId}, { $set: { 'products.$.quantity': newQuantity} });
    },
});