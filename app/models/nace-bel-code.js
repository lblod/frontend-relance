import Model, { attr } from '@ember-data/model';

export default class NaceBelCodeModel extends Model {
  @attr uri;
  @attr label;
}
