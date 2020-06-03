import Route from '@ember/routing/route';

export default class EntrepreneursSubjectPagesIndexRoute extends Route {
  queryParams = {
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
    postalCode: { refreshModel: true }
  };

  model(params) {
    const query = {
      page: {
        size: params.size,
        number: params.page
      },
      sort: params.sort,
      include: [
        'location',
        'categories',
        'nace-bel-codes',
        'opening-hours-specifications',
        'opening-hours-specifications',
        'opening-hours-specifications.day-of-week'
      ].join(',')
    };

    if (params.postalCode) {
      query['filter'] = {
        location: {
          'postal-code': params.postalCode
        }
      };
    }

    return this.store.query( 'local-business', query);
  }
}
