Template.productDetails.helpers({
  owner: function() {
    var user = Meteor.users.findOne(this.createdBy);
    if (user) {
        return user.profile.fullName;
    }
    else {
        return "UNDEFINED.";
    }
  }
});