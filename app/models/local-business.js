import Model, {attr, belongsTo, hasMany} from '@ember-data/model';

export default class LocalBusinessModel extends Model {
  @attr name;
  @attr description;
  @attr url;
  @attr email;
  @attr telephone;

  @belongsTo('location') location;
  @hasMany('category') categories;
}
