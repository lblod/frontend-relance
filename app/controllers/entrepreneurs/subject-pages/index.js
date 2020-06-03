import Controller from '@ember/controller';

export default class EntrepreneursSubjectPagesIndexController extends Controller {
  sort = 'name';
  page = 0;
  size = 10;

  get locationName() {
    if (this.postalCode && this.model.length) {
      return this.model.firstObject.get('location.city');
    } else {
      return null;
    }
  }
}
