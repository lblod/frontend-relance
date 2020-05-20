import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class LocalBusinessDetailsComponent extends Component {
  @service store
  @tracked categories = A()
  @tracked nacebel = A()
  @tracked types = A()

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  @task
  *loadData() {
    if (this.args.localBusiness.types) {
      for (let type of this.args.localBusiness.types) {
        const categories = yield this.store.query('category', {
          'filter[:uri:]': type
        });
        if (categories.length) {
          this.categories.pushObject(categories.firstObject);
        } else {
          const nacebel =  yield this.store.query('nace-bel-code', {
            'filter[:uri:]': type
          });
          if (nacebel.length)
            this.nacebel.pushObject(nacebel.firstObject);
        }
      }
    } else {
      this.categories = yield this.args.localBusiness.categories;
      this.nacebel = yield this.args.localBusiness.naceBelCodes;
    }
  }

  get categoryLabels() {
    return this.categories && this.categories.map(c => c.label).join(', ');
  }

  get nacebelLabels() {
    return this.nacebel && this.nacebel.map(c => c.label).join(', ');
  }
}
