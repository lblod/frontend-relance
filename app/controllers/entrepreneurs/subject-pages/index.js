import Controller from '@ember/controller';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

export default class EntrepreneursSubjectPagesIndexController extends Controller {
  sort = 'name';
  page = 0;
  size = 10;

  @tracked succesMessage = false

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

  @action
  copyListHtml() {
    const elements = window.document.getElementsByClassName('copy-snippet');
    const node = window.document.createElement('div');
    for (let el of elements) {
      const child = window.document.createElement('div');
      child.innerHTML = el.innerHTML;
      node.appendChild(child);
    }
    return node.innerHTML;
  }

  @action
  copySuccess() {
    this.succesMessage = true;

    later(this, function() {
      this.succesMessage = false;
    }, 800);
  }
}
