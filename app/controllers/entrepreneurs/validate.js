import Controller from '@ember/controller';
import { task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { isEmpty } from '@ember/utils';
import { warn } from '@ember/debug';
import fetch from 'fetch';

export default class EntrepreneursValidateController extends Controller {
  @tracked localBusinesses = []
  @tracked url

  get isDisabled() {
    return isEmpty(this.url);
  }

  @task
  *harvestUrl() {
    this.localBusinesses = [];

    try {
      const endpoint = `/extract/business?url=${encodeURIComponent(this.url)}`;
      const options = {
        headers: { 'Accept': 'application/vnd.api+json' }
      };
      this.localBusinesses = yield (yield fetch(endpoint, options)).json();
    } catch (e) {
      warn(`Failed to harvest URL ${this.url}: ${e.message}`, { id: 'harvest-error' });
    }
  }
}
