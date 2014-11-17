Template.dashboard.rendered = function() {

};

Template.dashboard.events = {
    'keydown input#item' : function (event) {
        if (event.which == 13) {//enter key
            var name = document.getElementById('itemInput');
            var rating = 3;

            if (name.value != '') {
                items.insert({
                   name: name.value,
                   rating: rating
                });

                document.getElementById('itemInput').value ='';
                item.value='';
            }
        }
    }
}
