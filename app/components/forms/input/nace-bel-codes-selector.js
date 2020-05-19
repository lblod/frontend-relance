import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormsInputNaceBelCodesSelectorComponent extends Component {
  @tracked selections;
  @tracked options;
  @service store;

  constructor(){
    super(...arguments);
    this.selections = this.args.selections;
    this.loadOptions.perform();
  }

  @task
  *loadOptions(searchData){
    let query = {};
    if(searchData){
      query = {'filter[label]': searchData};
    }
    const categories = yield this.store.query('nace-bel-code', query);
    this.options = categories.sortBy('label');
  }

  @action
  update(selections){
    this.selected = selections;
    this.args.onUpdate(selections);
  }
}
