Template.createProduct.created = function() {
    loadFilePicker('Ad9QH1b3WRwqRwN8Dp6QJz');
    Session.set('pImage', '/images/default_product.png');
};


Template.createProduct.helpers({
    imgLink: function() {
        return Session.get('pImage');
    }
});

Template.createProduct.events({
    'click #upload': function(e,t) {
        filepicker.pick(
        {
            mimetypes: ['image/gif', 'image/jpeg', 'image/png'],
            multiple: false
        },
        function(InkBlob) {
            console.log(InkBlob.url);
            pictureUrl = InkBlob.url;
            Session.set('pImage', pictureUrl);

        },
        function(FPError) {
            if(FPError && FPError.code !== 101)
                alert(FPError.toString());
        }
        );
    },
    'submit form#createProduct': function (e, t) {
        e.preventDefault();
        var name = t.find('#productName').value;
        var price = t.find('#productPrice').value;
        var quantity = t.find('#productQuanitty').value;
        var description = t.find('#productDescription').value;
        var pic = pictureUrl;     //get URL of image

        if (name && price > 0 && quantity > 0 && description){
            Meteor.call('createProduct', Meteor.userId(), name, price, quantity, description, pic, function (error, result) {
                if (error) console.log(error);
                Router.go('home');
            });
        }
        else {
            console.log('name and description must be provided, price and quantity must be over 0');
        }
    }
});
