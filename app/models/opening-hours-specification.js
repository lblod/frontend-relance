import Model, { attr, belongsTo } from '@ember-data/model';

export default class OpeningHoursSpecificationModel extends Model {
  @attr('date') validFrom;
  @attr('date') validThrough;
  @attr  opens;
  @attr  closes;
  
  @belongsTo('local-business') localBusiness;
  @belongsTo('day-of-week') dayOfWeek;
}
