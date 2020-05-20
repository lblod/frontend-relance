import Route from '@ember/routing/route';

export default class EntrepreneursSubjectPagesShowRoute extends Route {
  model(params){
    return this.store.find('local-business', params.id);
  }
}
