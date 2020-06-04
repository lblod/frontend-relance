import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @service appState
  @service router

  @tracked postalCode

  get invalidInput() {
    return !this.postalCode;
  }

  @action
  setAppDidRender(){
    this.appState.didRender = true;
  }

  @action
  goToSubjectsOverviewPage() {
    let postalCode = this.postalCode || '2800';
    this.postalCode = null;
    this.router.transitionTo('entrepreneurs.subject-pages', {
      queryParams: {
        page: 0,
        postalCode: postalCode
      }
    });
  }
}
