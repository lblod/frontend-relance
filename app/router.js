import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('entrepreneurs', { path: '/ondernemers' }, function() {
    this.route('new');
    this.route('edit', { path: '/:id' }, function() {
      this.route('step-1', { path: '/stap-1' });
      this.route('step-2', { path: '/stap-2' });
    });
    this.route('validate');
  });

  this.route('local-governments', { path: '/lokale-besturen' }, function() {});
});
