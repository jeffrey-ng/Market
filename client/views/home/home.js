Template.home.rendered = function() {

};

Template.home.helpers({
  products: function() {
    return Products.find();
  }
});

