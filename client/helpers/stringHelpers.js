Template.registerHelper('siteTitle', function(string) {
  return SEO.settings.title;
});

Template.registerHelper('summarize', function(string) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(80);
});


Template.registerHelper('nameSummarize', function(string) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(30);
});


Template.registerHelper('prettifyDate', function(timestamp) {
    return moment(timestamp).format('MM-DD-YYYY');
});

UI.registerHelper('formatMoney', function( number) {
    return accounting.formatMoney(number);
});

UI.registerHelper('total', function (products) {
    var total = 0.0;
    _.map(this.products, function (product) {
      total += product.price * product.quantity;
    });
    return accounting.formatMoney(total);
})

