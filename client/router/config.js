Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  waitOn: function(){return Meteor.subscribe('cart', Session.get('carts'))},

  yieldTemplates: {
    header: {
      to: 'header'
    },
    footer: {
      to: 'footer'
    }
  },

  onAfterAction: function() {
    $(document).scrollTop(0);
  }
});

Router.onBeforeAction('loading');
