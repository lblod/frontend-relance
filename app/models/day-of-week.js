import Model, { attr } from '@ember-data/model';

export default class DayOfWeekModel extends Model {
  @attr('number') position;
  @attr name;

}
