import Route from '@ember/routing/route';

export default class EntrepreneursNewRoute extends Route {
  model() {
    const business = this.store.createRecord('local-business');
    return business.save();
  }

  afterModel(model) {
    this.transitionTo('entrepreneurs.edit.step-1', model);
  }
}
