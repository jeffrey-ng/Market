
Schema = {};

Schema.UserProfile = new SimpleSchema({
    fullName: {
        type: String,
        label: 'Full Name',
        optional: false
    },

    bio: {
        type: String,
        label: 'Bio',
        optional: true
    },
    website: {
        type: String,
        label: 'Website',
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    }
});

Schema.User = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    emails: {
        type:[Object],
        optional: false
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    profile: {
        type:Schema.UserProfile,
        optional: true
    }

});


Meteor.users.attachSchema(Schema.User);
