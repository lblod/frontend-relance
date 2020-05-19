import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const hhmmssRegex = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$');
const hhmmRegex = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]');

export default class FormsInputTimeComponent extends Component {
  @tracked _value;

  constructor() {
    super(...arguments);
    if (hhmmssRegex.test(this.args.value)) {
      this._value = this.args.value.substr(0, 5); // hh:mm
    } else {
      this._value = null;
    }
  }

  get hasError() {
    return this.error.toString();
  }

  get error() {
    return !hhmmRegex.test(this._value);
  }

  @action
  updateValue() {
    if (this._value) {
      const value = `${this._value}:00`;
      this.args.onChange(value);
    } else {
      this.args.onChange(null);
    }
  }
}
