import Route from '@ember/routing/route';

export default class EntrepreneursSubjectPagesEditRoute extends Route {
  async model(params){
    const businesses = await this.store.query( 'local-business', {
      'filter[:id:]': params.id,
      page: { size: 1 },
      include: [
        'location',
        'categories',
        'nace-bel-codes',
        'opening-hours-specifications',
        'opening-hours-specifications',
        'opening-hours-specifications.day-of-week'
      ].join(',')
    });
    return businesses.firstObject;
  }
}
