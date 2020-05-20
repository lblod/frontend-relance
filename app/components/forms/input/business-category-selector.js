import Component from '@glimmer/component';
import { keepLatestTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormsInputBusinessCategorySelectorComponent extends Component {
  @tracked selections;
  @tracked options;
  @service store;

  constructor(){
    super(...arguments);
    this.selections = this.args.selections;
    this.loadOptions.perform();
  }

  @keepLatestTask
  *loadOptions(searchData) {
    const query = {
      page: { size: 200 }
    };
    if (searchData) {
      yield timeout(300);
      query['filter[label]'] = searchData;
    }
    const categories = yield this.store.query('category', query);
    this.options = categories.sortBy('label');
  }

  @action
  update(selections){
    this.selected = selections;
    this.args.onUpdate(selections);
  }
}
