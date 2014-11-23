Template.profile.helpers({
  email: function() {
    return this.emails[0].address;
  },
  isOwner: function () {
    //this._id = ID of the owner
    //Meteor.userId() = ID of the logged in user
    return this._id == Meteor.userId();
  },
  posted: function () {
    return Products.find({createdBy: this._id}).count();
  }
});