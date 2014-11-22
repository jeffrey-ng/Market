Template.dashboard.rendered = function() {

};

Template.dashboard.helpers({
    products: function() {
        return Products.find();

    }
});