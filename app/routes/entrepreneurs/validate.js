import Route from '@ember/routing/route';

export default class EntrepreneursValidateRoute extends Route {
  setupController(controller) {
    super.setupController(...arguments);
    controller.url = null;
    controller.localBusinesses = [];
  }
}
