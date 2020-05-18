import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class OpeningHoursDetailsComponent extends Component {
  @service store

  @tracked daysOfWeek = []

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  @task
  *loadData() {
    this.daysOfWeek = yield this.store.query('day-of-week', {
      sort: 'position',
      page: { size: 10 }
    });
  }

  get hasOpeningHours() {
    return this.args.openingHours && this.args.openingHours.length;
  }

  get validFrom() {
    if (this.hasOpeningHours) {
      return this.args.openingHours[0].validFrom;
    } else {
      return null;
    }
  }

  get validThrough() {
    if (this.hasOpeningHours) {
      return this.args.openingHours[0].validThrough;
    } else {
      return null;
    }
  }

  get groupedOpeningHours() {
    if (this.hasOpeningHours) {
      return this.daysOfWeek.map((day) => {
        const hours = this.args.openingHours.filter(h => h.day.uri == day.uri);
        return {
          day: day,
          hours: hours
        };
      });
    } else {
      return [];
    }
  }
}
