Meteor.methods({
    editProfile: function(userId, fullName, website, bio) {
        Meteor.users.update({_id: userId}, {$set: {'profile.fullName': fullName, 'profile.website': website, 'profile.bio':bio}});

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