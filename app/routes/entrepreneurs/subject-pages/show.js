import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class EntrepreneursSubjectPagesShowRoute extends Route {
  @service fastboot;

  async model(params){
    const businesses = await this.store.query( 'local-business', {
      "filter[:id:]": params.id,
      include: "location,categories,nace-bel-codes,opening-hours-specifications,opening-hours-specifications,opening-hours-specifications.day-of-week"
    });
    return businesses.firstObject;
  }
}
