import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormsDisplayUrlSubjectPageComponent extends Component {
  @tracked succesMessage = false

  @action
  copySuccess() {
    this.succesMessage = true;
  }
}
