Meteor.methods({
    editProfile: function(userId, fullName) {
        Meteor.users.update({_id: userId}, {$set: {'profile.fullName': fullName}});

    },
    createProduct: function(userId, productName, price, number) {
        console.log("insertgin");
        Products.insert({
            createdBy: userId,
            name: productName,
            quantity: number,
            price: price
        });
    }
});