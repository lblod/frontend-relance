import Route from '@ember/routing/route';

export default class EntrepreneursNewRoute extends Route {
  async model() {
    const location = this.store.createRecord('location');
    const business = this.store.createRecord('local-business', { location });
    location.localBusiness = business;
    await location.save();
    return business.save();
  }

  afterModel(model) {
    this.transitionTo('entrepreneurs.edit.step-1', model);
  }
}
