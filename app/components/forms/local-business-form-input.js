import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FormsLocalBusinessFormInputComponent extends Component {
  @service store;
  @tracked localBusiness = this.args.localBusiness;
  @tracked openingHoursValidFrom = new Date();
  @tracked openingHoursValidTo = new Date();

  @action
  addOpeningHoursSpecification(){
    const hours = this.store.createRecord('opening-hours-specification', {
      localBusiness: this.localBusiness,
      opens: '00:00',
      closes: '00:00'
    } );
    this.localBusiness.openingHoursSpecifications.pushObject(hours);
  }

  applyValidityPeriod(){
    this.localBusiness.openingHoursSpecifications.forEach(hourSpec => {
      hourSpec.validFrom = this.openingHoursValidFrom.toISOString().split("T")[0];
      hourSpec.validThrough = this.openingHoursValidTo.toISOString().split("T")[0];
    });
  }

  @action
  addCategory(category){
    this.localBusiness.categories.setObjects([category]);
  }

  @action
  updateValidityFrom(dates){
    if(!dates.length) return;
    this.openingHoursValidFrom = dates[0];
  }

  @action
  updateValidityTo(dates){
    if(!dates.length) return;
    this.openingHoursValidTo = dates[0];
  }

  @action
  submit(){
    this.applyValidityPeriod();
    this.args.onSubmit(this.localBusiness);
  }

}
