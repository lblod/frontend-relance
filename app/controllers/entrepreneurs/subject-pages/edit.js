import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class EntrepreneursSubjectPagesEditController extends Controller {
  overviewRoute = "entrepreneurs.subject-pages.index";
  
  @action
  backToOverview(){
    this.transitionToRoute(this.overviewRoute);
  }
}
