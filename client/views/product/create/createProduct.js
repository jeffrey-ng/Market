Template.createProduct.events({
    'click #upload': function() {
        filepicker.pick(
        {
            mimetypes: ['image/gif', 'image/jpeg', 'image/png'],
            multiple: false
        },
        function(InkBlob) {
            var image = Images.findOne({userId: Meteor.userId() });
            if(image) {
                Images.update({_id: image._id},
                {
                    $set:{
                        filepickerId:_.last(InkBlob.url.split("/"))
                    }
                });
            }
            else {
                Images.insert({
                    userId: Meteor.userId(), 
                    filepickerId: _.last(InkBlob.url.split("/"))
                });
            }
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
        var pic = '{{image}}.url';      //get URL of image

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
