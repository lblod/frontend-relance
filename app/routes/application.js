import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {

  model(){
    const location = this.store.createRecord('location');
    const business = this.store.createRecord('local-business', { location });
    location.localBusiness = business;
    return business;
  }
}
