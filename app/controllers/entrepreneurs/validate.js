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
  @tracked error

  get isDisabled() {
    return isEmpty(this.url) || this.harvestUrl.isRunning ? "true" : "false";
  }

  @task
  *harvestUrl() {
    this.localBusinesses = [];

    try {
      const endpoint = `/extract/business?url=${encodeURIComponent(this.url)}`;
      const options = {
        headers: { 'Accept': 'application/vnd.api+json' }
      };

      const response = yield fetch(endpoint, options);
      if (response.ok) {
        this.localBusinesses = yield response.json();
        this.erros = null;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (e) {
      warn(`Failed to harvest URL ${this.url}: ${e.message}`, { id: 'harvest-error' });
      this.localBusinesses = [];
      this.error = "failed to harvest";
    }
  }
}
