import Model, {attr, belongsTo, hasMany} from '@ember-data/model';

export default class LocalBusinessModel extends Model {
  @attr uri;
  @attr name;
  @attr description;
  @attr url;
  @attr email;
  @attr telephone;

  @hasMany('opening-hours-specification') openingHoursSpecifications;
  @belongsTo('location') location;
  @hasMany('category') categories;
}
