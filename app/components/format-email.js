import Component from '@glimmer/component';

export default class FormatEmailComponent extends Component {
  get formattedEmail() {
    const i = 'mailto:'.length;
    return this.args.value && this.args.value.length >= i && this.args.value.slice(i);
  }
}
