import Model, {attr, belongsTo, hasMany} from '@ember-data/model';

export default class LocalBusinessModel extends Model {
  @attr uri;
  @attr name;
  @attr description;
  @attr url;
  @attr imageUrl;
  @attr email;
  @attr telephone;
  @attr('datetime') created;
  @attr('datetime') modified;

  @hasMany('opening-hours-specification') openingHoursSpecifications;
  @hasMany('nace-bel-code') naceBelCodes;
  @belongsTo('location') location;
  @hasMany('category') categories;
}
