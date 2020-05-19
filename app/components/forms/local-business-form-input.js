import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FormsLocalBusinessFormInputComponent extends Component {
  @service store;
  @tracked localBusiness = this.args.localBusiness;
  @tracked openingHoursValidFrom = new Date();
  @tracked openingHoursValidTo = new Date();

  get errorUrl(){
    return this.localBusiness.url && !this.localBusiness.url.match(/^(http|ftp)s?:\/\/[\w.-]+\.\w+(\/.*)?/);
  }

  get errorEmail(){
    return this.localBusiness.email && !this.localBusiness.email.match(/\S+@\S+\.\S+/);
  }

  @action
  addOpeningHoursSpecification(){
    const hours = this.store.createRecord('opening-hours-specification', {
      localBusiness: this.localBusiness,
      opens: '10:00',
      closes: '18:00'
    } );
    this.localBusiness.openingHoursSpecifications.pushObject(hours);
  }

  @action
  async removeOpeningHoursSpecification(hour){
    await hour.destroyRecord();
    this.localBusiness.openingHoursSpecifications.removeObject(hour);
  }

  applyValidityPeriod(){
    this.localBusiness.openingHoursSpecifications.forEach(hourSpec => {
      hourSpec.validFrom = this.openingHoursValidFrom;
      hourSpec.validThrough = this.openingHoursValidTo;
    });
  }

  @action
  async addCategories(selections){
    this.localBusiness.categories.setObjects([]);
    await this.localBusiness.save();
    this.localBusiness.categories.setObjects(selections);
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
