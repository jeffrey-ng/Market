Template.createProduct.events({
    'submit form#createProduct': function (e, t) {
        e.preventDefault();
        var name = t.find('#productName').value;
        var price = t.find('#productPrice').value;
        var quantity = t.find('#productQuanitty').value;
        var description = t.find('#productDescription').value;

        if (name && price > 0 && quantity > 0 && description){
            Meteor.call('createProduct', Meteor.userId(), name, price, quantity, description, function (error, result) {
                if (error) console.log(error);
                Router.go('home');
            });
        }
        else {
            console.log('name and description must be provided, price and quantity must be over 0');
        }
    }
});