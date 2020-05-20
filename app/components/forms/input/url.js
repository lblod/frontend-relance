import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';

const urlRegex = new RegExp('^(http|ftp)s?:\/\/.*');

export default class FormsInputUrlComponent extends Component {
  @tracked _value;

  constructor() {
    super(...arguments);
    this._value = this.args.value;
  }

  get hasError() {
    return this._value && this.error.toString();
  }

  get error() {
    return !urlRegex.test(this.args.value);
  }

  @action
  updateValue() {
    this.args.onChange(this._value);
  }

}
