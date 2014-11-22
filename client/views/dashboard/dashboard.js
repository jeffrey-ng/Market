Template.dashboard.rendered = function() {

};

Template.dashboard.helpers({
    products: function() {
        return Products.find();

    }
});

Template.dashboard.events = {
    'keydown input#itemInput' : function (event) {
        if (event.which == 13) {//enter key
            var name = document.getElementById('itemInput');
            var rating = 3;

            if (name.value != '') {
                Items.insert({
                   name: name.value,
                   rating: rating
                });

                document.getElementById('itemInput').value ='';
                item.value = '';
            }
        }
    }
}
