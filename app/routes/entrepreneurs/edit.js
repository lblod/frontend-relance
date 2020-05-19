import Route from '@ember/routing/route';

export default class EntrepreneursEditRoute extends Route {
  async model(params) {
    const businesses = await this.store.query('local-business', {
      filter: {
        id: params.id
      },
      page: {
        size: 1
      }
    });
    return businesses.firstObject;
  }
}
