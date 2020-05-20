import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

const emailRegex = new RegExp('^mailto:\S+@\S+\.\S+');
const mailtoRegex = new RegExp('^mailto:.*');

export default class FormsInputEmailComponent extends Component {
  @tracked _value;

  constructor() {
    super(...arguments);
    if (mailtoRegex.test(this.args.value)) {
      this._value = this.args.value.slice('mailto:'.length);
    } else {
      this._value = null;
    }
  }

  get hasError() {
    return this.error ? "true" : "false";
  }

  get error() {
    return false;
  }

  @action
  updateValue() {
    if (this._value) {
      const value = `mailto:${this._value}`;
      this.args.onChange(value);
    } else {
      this.args.onChange(null);
    }
  }
}
