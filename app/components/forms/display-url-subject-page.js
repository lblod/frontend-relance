import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

export default class FormsDisplayUrlSubjectPageComponent extends Component {
  @tracked succesMessage = false

  @action
  copySuccess() {
    this.succesMessage = true;

    later(this, function() {
      this.succesMessage = false;
    }, 800);
  }
}
