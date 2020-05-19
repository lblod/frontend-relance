import Component from '@glimmer/component';

export default class FormatTimeComponent extends Component {
  get formattedTime() {  // hh:mm
    return this.args.time && this.args.time.length >= 5 && this.args.time.substr(0, 5);
  }
}
