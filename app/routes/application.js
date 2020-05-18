import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  model() {
    const business = this.store.createRecord('local-business', {name: 'felix'});
    return business.save();
  }
}
