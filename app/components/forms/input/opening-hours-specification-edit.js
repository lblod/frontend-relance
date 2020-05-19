import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormsInputOpeningHoursSpecificationEditComponent extends Component {
  @service store;
  @tracked openingHourSpec = this.args.openingHoursSpecification;
  @tracked daysOfWeek = [];

  constructor(){
    super(...arguments);
    this.loadDaysOfWeek.perform();
  }

  @task
  *loadDaysOfWeek(){
    this.daysOfWeek = yield this.store.query('day-of-week', {
      sort: 'position',
      page: { size: 10 }
    });
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
