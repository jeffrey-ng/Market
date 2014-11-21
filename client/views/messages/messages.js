Template.messages.helpers({
    messages: function() {
        return Messages.find();
    },
    userName: function() {
        return Meteor.users.findOne({_id: this.createdBy}).profile.fullName;
    }
});


// Template.messages.events={
//     "click #commentInput": function(){
//         e.preventDefault();

//             var createdBy = Meteor.userId();
//             var message = document.getElementById('comment');
//             console.log("jeff");
//             console.log(createdBy);
//             if (message.value != '') {
//                 Meteor.call('createMessage', createdBy,message.value,this._id, function (error, result) {
//                     if(error) console.log(error);
//                 });

//                 message.value='';
//             }
//     }
// }

Template.entryField.events = {
    "keydown #comment": function(event){
        if(event.which == 13) {
            //submit form

            var createdBy = Meteor.userId();
            var message = document.getElementById('comment');
            console.log(createdBy);
            if (message.value != '') {
                Meteor.call('createMessage', createdBy,message.value,this._id, function (error, result) {
                    if(error) console.log(error);
                });

                message.value='';
            }
        }
    },
}