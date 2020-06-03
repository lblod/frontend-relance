import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import transition from 'frontend-relance/utils/page-transition';

export default class CrossAnimateTagsComponent extends Component {
  transition = transition;

  @service appState

  /**
   * This value will be set to a random value so we don't accidentally
   * pretend to match items which have nothing to do with each other.
   */
  @tracked
  predicate = null;

  constructor(){
    super(...arguments);
    this.predicate = Math.random();
  }
}
