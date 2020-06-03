import Controller from '@ember/controller';
import { action } from '@ember/object';
import { computed } from '@ember/object';

export default class EntrepreneursSubjectPagesIndexController extends Controller {
  sort = 'name';
  page = 0;
  size = 10;

  get locationName() {
    if (this.postalCode && this.model.length) {
      return this.model.firstObject.get('location.city');
    } else {
      return null;
    }
  }

  @computed('page', 'size')
  get rangeStart() {
    return this.page * this.size + 1;
  }

  @computed('rangeStart', 'size', 'total')
  get rangeEnd() {
    const end = this.rangeStart + this.size - 1;
    return end > this.total ? this.total : end;
  }

  @computed('page')
  get isFirstPage() {
    return this.page == 0;
  }

  @computed('rangeEnd', 'total')
  get isLastPage() {
    return this.rangeEnd == this.total;
  }

  get total() {
    return this.model.meta.count;
  }

  @action
  previousPage() {
    this.set('page', this.page - 1);
  }

  @action
  nextPage() {
    this.set('page', this.page + 1);
  }

}
