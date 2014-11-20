Template.productDetails.helpers({
  owner: function() {
    var user = User.find({'_id': this.createdBy});
    if (user) {
        return user.profile.fullName;
    }
    else {
        return "UNDEFINED.";
    }
  }
});