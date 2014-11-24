Template.order.helpers({
    orders: function() {
        return Orders.find({userId: Meteor.userId()}, {sort: {createdAt: -1}});
    },
    orderCount: function(orderId) {
        return (Orders.find({_id: orderId})).count();
    }
});
