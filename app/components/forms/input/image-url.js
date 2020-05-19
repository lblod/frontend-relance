import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormsInputImageUrlComponent extends Component {
  @tracked _value = null;
  @tracked showImage = true;
  @tracked errorUrl = false;

  constructor() {
    super(...arguments);
    if (this.args.imageUrl) {
      this._value = this.args.imageUrl;
    }
  }

  isValidUrl(url){
    return url.match(/^(http)s?:\/\/[\w.-]+\.\w+(\/.*)?/); //removed ftp
  }

  get canShowImage(){
    return this._value && this.isValidUrl(this._value);
  }

  @action
  toggleImage(){
    this.showImage = !this.showImage;
  }

  @action
  updateUrl(){
    if (this._value) {
      this.errorUrl = !this.isValidUrl(this._value);
      this.args.onUpdate(this._value);
    }
    else {
      this.args.onUpdate(null);
    }
  }

}
