Template.createProduct.events({
    'submit form#createProduct': function (e, t) {
        e.preventDefault();
        var name = t.find('#productName').value;
        var price = t.find('#productPrice').value;
        var quantity = t.find('#productQuanitty').value;
        var description = t.find('#productDescription').value;

        Meteor.call('createProduct', Meteor.userId(), name, price, quantity, description, function (error, result) {
            if (error) console.log(error);
            Router.go('home');
        });
    }
});