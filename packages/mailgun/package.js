Package.describe({
  summary: " \* Fill me in! *\ ",
  version: "1.0.0",
  git: " \* Fill me in! *\ "
});


Package.onUse(function(api) {
  Npm.depends({'mailgun-js': '0.6.3'})
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('mailgun.js', 'server');
  
  api.export('steps');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('mailgun');
  api.addFiles('mailgun-tests.js');
});
