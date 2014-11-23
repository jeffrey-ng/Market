Template.userProducts.rendered = function() {

};

Template.userProducts.helpers({
    products: function() {
    	return Products.find({createdBy: this._id});
    }
});