Template.editProfile.events({
    'submit form#editProfileForm': function (e, t) {
        e.preventDefault();
        var fullName = t.find('#edit-fullName').value;
        Meteor.call('editProfile', Meteor.userId(), fullName, function (error, result) {
            if(error) console.log(error);
            Router.go('profile');
        });
    }
});