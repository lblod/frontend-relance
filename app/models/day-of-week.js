import Model, { attr } from '@ember-data/model';

export default class DayOfWeekModel extends Model {
  @attr uri;
  @attr('number') position;
  @attr name;
}
