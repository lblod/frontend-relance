import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { get } from '@ember/object';

export default class OpeningHoursDetailsComponent extends Component {
  @service store

  @tracked daysOfWeek = []
  @tracked openingHours = []

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
    const openingHours = yield this.args.openingHours;
    this.openingHours = openingHours ? openinsgHours.toArray() : [];
  }

  get hasOpeningHours() {
    return this.openingHours && this.openingHours.length;
  }

  get validFrom() {
    if (this.hasOpeningHours) {
      return this.openingHours[0].validFrom;
    } else {
      return null;
    }
  }

  get validThrough() {
    if (this.hasOpeningHours) {
      return this.openingHours[0].validThrough;
    } else {
      return null;
    }
  }

  get groupedOpeningHours() {
    if (this.hasOpeningHours) {
      return this.daysOfWeek.map((day) => {
        const hours = this.openingHours.filter(h => get(h, 'dayOfWeek.uri') == day.uri);
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
