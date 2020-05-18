import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FormsLocalBusinessFormInputComponent extends Component {
  @service store;
  @tracked localBusiness = this.args.localBusiness;

  @action
  addOpeningHoursSpecification(){
    const hours = this.store.createRecord('opening-hours-specification', { localBusiness: this.localBusiness } );
    this.localBusiness.openingHoursSpecifications.pushObject(hours);
  }

}
