Template.editProduct.created = function() {
    loadFilePicker('Ad9QH1b3WRwqRwN8Dp6QJz');
};

Template.editProduct.rendered = function() {
    console.log(this.data.pic);
    Session.set('pImage', this.data.pic);

};


Template.editProduct.helpers({
    imgLink: function() {
        return Session.get('pImage');
    }
});

Template.editProduct.events({
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
    'submit form#editProduct': function (e, t) {
        e.preventDefault();
        var name = t.find('#productName').value;
        var price = t.find('#productPrice').value;
        var quantity = t.find('#productQuanitty').value;
        var description = t.find('#productDescription').value;
        var pic = Session.get('pImage');     //get URL of image
        var pId = this._id;

        if (name && price > 0 && quantity > 0 && description){
            Meteor.call('editProduct', pId , name, price, quantity, description, pic, function (error, result) {
                if (error) console.log(error);
                Router.go('productDetails', {_id: pId});
            });
        }
        else {
            console.log('name and description must be provided, price and quantity must be over 0');
        }
    }
});
