import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class EntrepreneursEditStep2Controller extends Controller {
  @service router;

  get urlForSubjectPage(){
    return window.location.origin + this.router.urlFor('entrepreneurs.subject-pages.show', this.model.id);
  }
}
