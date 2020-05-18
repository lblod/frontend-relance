import Model, { attr, belongsTo } from '@ember-data/model';

export default class OpeningHoursSpecificationModel extends Model {
  @attr validFrom;
  @attr validThrough;
  @attr  opens;
  @attr  closes;
  
  @belongsTo('local-business') localBusiness;
  @belongsTo('day-of-week') dayOfWeek;
}
