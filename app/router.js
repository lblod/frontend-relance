import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import EmberRouterScroll from 'ember-router-scroll';

export default class Router extends EmberRouterScroll {
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

    this.route('subject-pages', function() {
      this.route('show', { path: '/:id/details' });
      this.route('edit', { path: '/:id/edit' });
      this.route('new');
    });
  });

  this.route('local-governments', { path: '/lokale-besturen' }, function() {});
  this.route('disclaimer', { path: '/disclaimer' }, function() {});
  this.route('search', { path: '/zoek' }, function() {});
});
