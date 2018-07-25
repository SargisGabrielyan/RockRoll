import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('bands', function() {
    this.route('band', {path: ':id'}, function() {
      this.route('songs');
      this.route('details');
    });
  });

  this.route('test-page', {path: 'test-page-test'});
  this.route('new-test');
});

export default Router;
