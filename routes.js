Router.map(function() {

  this.route('home', {
    path: '/',
    waitOn: function() {
      return this.subscribe("someProducts", 8);
    }
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
    data: function() {
      return Meteor.users.findOne(this.params._id);
    }
  });

  this.route('editProfile', {
    path: '/profile/:_id/edit',
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

  this.route('productDetails', {
    path: '/product/:_id',
    waitOn: function(){ return Meteor.subscribe('productDetails',this.params._id)},
    data: function() {
      return Products.findOne(this.params._id);
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
