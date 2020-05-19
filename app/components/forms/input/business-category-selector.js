import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormsInputBusinessCategorySelectorComponent extends Component {
  @tracked selected;
  @tracked options;
  @service store;

  constructor(){
    super(...arguments);
    this.selected = this.args.selected;
    this.loadOptions.perform();
  }

  @task
  *loadOptions(searchData){
    let query = {};
    if(searchData){
      query = {'filter[label]': searchData};
    }
    const categories = yield this.store.query('category', query);
    this.options = categories.sortBy('label');
  }

  @action
  update(selection){
    this.selected = selection;
    this.args.onUpdate(selection);
  }
}
