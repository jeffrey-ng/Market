Template.editProfile.events({
    'submit form#editProfileForm': function (e, t) {
        e.preventDefault();
        var fullName = t.find('#edit-fullName').value;
        var website = t.find('#edit-website').value;
        var bio = t.find('#edit-bio').value;
        Meteor.call('editProfile', Meteor.userId(), fullName,website,bio, function (error, result) {
            if(error) console.log(error);
            Router.go('profile', {_id: Meteor.userId()});
        });
    }
});