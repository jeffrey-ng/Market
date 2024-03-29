Meteor.startup(function() {
  if(Meteor.isClient) {
    SEO.config({
      title: 'Market',
      meta: {
        'description': 'A project by Nicolas Gontier-Angelard, Jeffrey Ng and Qiwei Sun'
      },
      og: {
        'image': Meteor.absoluteUrl('share-image.png')
      },
      ignore: {
        meta: ['fragment', 'viewport', 'msapplication-TileColor', 'msapplication-TileImage', 'msapplication-config'],
        link: ['stylesheet', 'apple-touch-icon', 'rel', 'shortcut icon', 'icon']
      }
    });
  }
});
