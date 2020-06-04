import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EntrepreneursEditStep2Controller extends Controller {
  @service router;
  @tracked displayCodeBlock = true;

  get urlForSubjectPage(){
    if (window.location)
      return window.location.origin + this.router.urlFor('entrepreneurs.subject-pages.show', this.model.id);
    else
      return this.router.urlFor('entrepreneurs.subject-pages.show', this.model.id);
  }

  @action
  toggleCodeBlock(){
    this.displayCodeBlock = !this.displayCodeBlock;
  }
}
