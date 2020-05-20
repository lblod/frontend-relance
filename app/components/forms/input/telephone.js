import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

const telRegex = new RegExp('^tel:.*');

export default class FormsInputTelephoneComponent extends Component {
  @tracked _value;

  constructor() {
    super(...arguments);
    if (telRegex.test(this.args.value)) {
      this._value = this.args.value.slice('tel:'.length);
    } else {
      this._value = null;
    }
  }

  get hasError() {
    return this.error.toString();
  }

  get error() {
    return false;
  }

  @action
  updateValue() {
    if (this._value) {
      const value = `tel:${this._value}`;
      this.args.onChange(value);
    } else {
      this.args.onChange(null);
    }
  }
}
