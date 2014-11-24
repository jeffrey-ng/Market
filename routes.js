Router.map(function() {

  this.route('home', {
    path: '/',
    waitOn: function() {
      return this.subscribe("someProducts", 8);
    }
  });

  this.route('explore', {
    path: '/explore',
    waitOn: function() {
      return this.subscribe("allProducts");
    },
    onAfterAction: function() {
      SEO.set({
        title: 'Explore | ' + SEO.settings.title
      });
    }
  });

  this.route('userProducts', {
    path: '/userProducts/:_id',
    waitOn: function() {
      return [this.subscribe('allProducts'), this.subscribe('allUsers')];
    },
    data: function() {
      return Meteor.users.findOne(this.params._id);
    },
    onAfterAction: function() {
      SEO.set({
        title: 'userProducts | ' + SEO.settings.title
      });
    }
  });

  this.route('profile', {
    path: '/profile/:_id',
    waitOn: function() {
      return [Meteor.subscribe('allUsers'), Meteor.subscribe('allProducts')];
    },
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

  this.route('editProduct', {
    path: '/product/:_id/edit',
    waitOn: function() {
      return Meteor.subscribe('productDetails',this.params._id);
    },
    data: function() {
      return Products.findOne(this.params._id);
    }
  });

  this.route('productDetails', {
    path: '/product/:_id',
    waitOn: function() {
      return [Meteor.subscribe('productDetails',this.params._id), Meteor.subscribe('messages',this.params._id), Meteor.subscribe('allUsers')];
    },
    data: function() {
      return Products.findOne(this.params._id);
    }
  });

  this.route('order', {
    path: '/order',
    waitOn: function() {
      return Meteor.subscribe('orders', Meteor.userId());
    }
  });

  this.route('showOrder', {
    path: '/order/:_id',
    waitOn: function(){ return Meteor.subscribe('showOrder', Meteor.userId(), this.params._id); },
    data: function(){ return Orders.findOne({userId: Meteor.userId(), _id: this.params._id}); }
  });


  this.route('checkout', {
    path: '/checkout'
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
