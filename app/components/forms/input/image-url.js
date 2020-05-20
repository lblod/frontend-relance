import { get } from '@ember/object';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import sizedImageUrl from 'frontend-relance/utils/sized-image-url';

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

  /**
   * Truethy if the supplied URL is a valid URL for an image.
   *
   * @param url {String} A string form of the URL which will be
   * tested.
   */
  isValidUrl(url){
    return url.match(/^(http)s?:\/\/[\w.-]+\.\w+(\/.*)?/); //removed ftp
  }

  /**
   * Truethy iff we can currently show an image.  Regardless of how it
   * has been shared.
   */
  get canShowImage(){
    return this.imageUrl;
  }

  /**
   * Truethy iff we have received a valid image URL.
   */
  get validImageUrl(){
    return this._value && this.isValidUrl(this._value);
  }

  /**
   * Gets the image URL to render.
   *
   * The URL of the user takes presedence over an uploaded file as we
   * prefer them to update the sources elsewhere.
   */
  get imageUrl(){
    if( this.validImageUrl )
      return this.validImageUrl;
    else {
      return this.args.localBusiness && this.args.localBusiness.uploadedImageUrl;
    }
  }

  @action
  toggleImage(){
    this.showImage = !this.showImage;
  }

  @action
  updateUrl(){
    if (this._value) {
      this.errorUrl = !this.isValidUrl(this._value);
      this.args.onUpdateUrl(this._value);
    }
    else {
      this.args.onUpdateUrl(null);
    }
  }
}
