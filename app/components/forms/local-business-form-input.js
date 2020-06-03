import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { guidFor } from '@ember/object/internals';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import move from 'ember-animated/motions/move';
import adjustCSS from 'ember-animated/motions/adjust-css';

export default class FormsLocalBusinessFormInputComponent extends Component {
  @service store;
  @tracked localBusiness = this.args.localBusiness;
  @tracked openingHoursValidFrom
  @tracked openingHoursValidTo

  inputId = guidFor(this);

  constructor() {
    super(...arguments);
    this.initializeOpeninghoursValidityDates();
  }

  initializeOpeninghoursValidityDates() {
    const openingHours = this.localBusiness.openingHoursSpecifications;
    if (openingHours.length) {
      const sortedOpeningHours = openingHours.sortBy('dayOfWeek.position', 'opens');
      this.localBusiness.openingHoursSpecifications = sortedOpeningHours;
      const first = sortedOpeningHours.firstObject;
      this.openingHoursValidFrom = first.validFrom;
      this.openingHoursValidTo = first.validThrough;
    } else {
      this.openingHoursValidFrom = new Date();
      this.openingHoursValidTo = new Date('2020-12-31');
    }
  }

  *openingHoursTransition({insertedSprites, removedSprites, keptSprites}) {
    for( const sprite of insertedSprites ) {
      fadeIn( sprite );
    }

    for( const sprite of keptSprites ) {
      move( sprite );
    }

    for( const sprite of removedSprites ) {
      sprite.applyStyles({ "z-index": "-1" });
      fadeOut( sprite );
    }
  }

  @action
  addOpeningHoursSpecification(){
    const hours = this.store.createRecord('opening-hours-specification', {
      localBusiness: this.localBusiness,
      opens: '10:00:00',
      closes: '18:00:00'
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
  async addNacebelCodes(selections){
    this.localBusiness.naceBelCodes.setObjects([]);
    await this.localBusiness.save();
    this.localBusiness.naceBelCodes.setObjects(selections);
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

  @action
  updateImageUrl(url){
    this.localBusiness.imageUrl = url;
  }
}
