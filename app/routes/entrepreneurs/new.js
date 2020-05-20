import Route from '@ember/routing/route';

export default class EntrepreneursNewRoute extends Route {
  async model() {
    // make sure we have a location
    const location = this.store.createRecord('location');

    // make sure we know the opening hours
    const firstDay = (await this.store.query('day-of-week', {
      sort: 'position',
      page: { size: 1 }
    })).firstObject;

    const openingHours = [this.store.createRecord('opening-hours-specification', {
      opens: "10:00:00",
      closes: "18:00:00",
      dayOfWeek: firstDay
    })];

    // create the business
    const business = this.store.createRecord('local-business', { location, openingHours });

    // backlink the business
    location.localBusiness = business;
    openingHours.forEach( (o) => o.localBusiness = business );

    // create leaf instances
    for( const h of openingHours )
      await h.save();
    await location.save();

    // create the business itself
    return business.save();
  }

  afterModel(model) {
    this.transitionTo('entrepreneurs.edit.step-1', model);
  }
}
