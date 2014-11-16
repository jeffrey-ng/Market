Meteor.methods({
    editProfile: function(userId, fullName) {
        Meteor.users.update({_id: userId}, {$set: {'profile.fullName': fullName}});

    }
});