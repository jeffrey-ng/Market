Meteor.startup(function() {
  Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY'
  });

  AccountsEntry.config({
    homeRoute: '/',
    dashboardRoute: '/dashboard',
    profileRoute: '/profile',
    language: 'en',
    showSignupCode: false,
    extraSignUpFields: [{
      field: "fullName",
      label: "Your Name",
      type: "text",
      required: true
    }]
  });
});
