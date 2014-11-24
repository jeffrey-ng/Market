Meteor.methods({
    editProfile: function(userId, fullName, website, bio) {
        Meteor.users.update(
            {_id: userId},
            {$set: {'profile.fullName': fullName, 'profile.website': website, 'profile.bio':bio}}
            );

    },
    createProduct: function(userId, productName, price, number, description, pic) {
        console.log("inserting");
        return Products.insert({
            createdBy: userId,
            name: productName,
            quantity: number,
            price: price,
            description: description,
            pic: pic
        });
    },
    editProduct: function(productId, productName, price, number, description, pic) {
        console.log("edit");
        Products.update(
            {_id: productId},
            {$set: {'name': productName, 'quantity': number, 'price': price, 'description': description, 'pic': pic}}
            );
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

    createMessage: function(userId, message, productId) {
        Messages.insert({'createdBy': userId, 'value': message,'productId': productId});
    },

    newOrder: function(userId, products) {
        var user = Meteor.users.findOne({_id: userId});
        console.log(user);
        var total = 0.0;
        _.map(products, function(product){
          total += product.quantity * product.price;
          Products.update({_id: product._id}, {$inc: {quantity: -(product.quantity)}});
        });
        return Orders.insert({userId: user._id, userFullName: user.profile.fullName, products: products});
    }
});