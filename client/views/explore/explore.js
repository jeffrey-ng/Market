Template.explore.rendered = function() {

};

Template.explore.helpers({
    products: function() {
        return Products.find();

    }
});