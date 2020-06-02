import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

export default class AppStateService extends Service {
  @tracked
  didRender = false
}
