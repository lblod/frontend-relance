import Component from '@glimmer/component';

export default class FormatTelephoneComponent extends Component {
  get formattedTelephone() {
    const i = 'tel:'.length;
    return this.args.value && this.args.value.length >= i && this.args.value.slice(i);
  }
}
