import Model, {attr, hasMany} from '@ember-data/model';

export default class LocationModel extends Model {
  @attr uri;
  @attr streetAddress;
  @attr postalCode;
  @attr city;
  @attr('string', { defaultValue: 'België' }) country;

  @hasMany('local-business') localBusinesses;
}
