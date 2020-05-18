import Model, {attr, hasMany} from '@ember-data/model';

export default class LocationModel extends Model {
  @attr uri;
  @attr streetAddress;
  @attr postalCode;
  @attr city;
  @attr country;

  @hasMany('local-business') localBusinesses;
}
