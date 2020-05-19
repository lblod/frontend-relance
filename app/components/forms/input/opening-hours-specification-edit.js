import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormsInputOpeningHoursSpecificationEditComponent extends Component {
  @service store;
  @tracked openingHourSpec = this.args.openingHoursSpecification;
  @tracked daysOfWeek = [];
  @tracked opens = this.openingHourSpec.opens;
  @tracked closes = this.openingHourSpec.closes;

  get errorOpenHour(){
    const re = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
    return !(re.test(this.openingHourSpec.opens)) ;
  }

  get errorCloseHour(){
    const re = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
    return !(re.test(this.openingHourSpec.closes)) ;
  }

  constructor(){
    super(...arguments);
    this.loadDaysOfWeek.perform();
  }

  @task
  *loadDaysOfWeek(){
    const days = yield this.store.findAll('day-of-week');
    this.daysOfWeek = days.sortBy('position');
  }

  @action
  updateDay(day){
    this.openingHourSpec.dayOfWeek = day;
  }

  @action
  removeEntry(){
    this.args.onRemove(this.openingHourSpec);
  }
}
