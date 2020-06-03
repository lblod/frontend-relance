import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from '../config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  constructor(){
    super(...arguments);
    this.host = window.BACKEND_URL;
  }
}
