Router.map(function() {

  this.route('home', {
    path: '/'
  });

  this.route('dashboard', {
    path: '/dashboard',
    loginRequired: 'entrySignIn',
    waitOn: function() {
      return this.subscribe("items");
    },
    data: {
      items: Items.find({})
    },
    onAfterAction: function() {
      SEO.set({
        title: 'Dashboard | ' + SEO.settings.title
      });
    }
  });

  this.route('profile', {
    path: '/profile/:_id',
    name: 'profile',
    data: function() {
      return Meteor.users.findOne(this.params._id);
    }
  });

  this.route('editProfile', {
    path: '/profile/:_id/edit',
    name: 'editProfile',
    data: function() {
      return Meteor.users.findOne(this.params._id);
    }
  });

  this.route('createProduct', {
    path: '/create',
    data: function() {
      return Meteor.user();
    }
  });

  this.route('notFound', {
    path: '*',
    where: 'server',
    action: function() {
      this.response.statusCode = 404;
      this.response.end(Handlebars.templates['404']());
    }
  });

});
