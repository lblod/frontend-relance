import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class EntrepreneursEditStep1Controller extends Controller {

  @action
  nextStep(localBusiness){
    this.transitionToRoute('entrepreneurs.edit.step-2', localBusiness);
  }

}
