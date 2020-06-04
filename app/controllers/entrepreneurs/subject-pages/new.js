import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class EntrepreneursSubjectPagesNewController extends Controller {
  @service router;
  overviewRoute = "entrepreneurs.subject-pages.index";
  @tracked displayCodeBlock = true;
  @tracked hasSaved = false;

  get urlForSubjectPage(){
    if (window.location)
      return window.location.origin + this.router.urlFor('entrepreneurs.subject-pages.show', this.model.id);
    else
      return this.router.urlFor('entrepreneurs.subject-pages.show', this.model.id);
  }

  @task
  *saveAll(localBusiness){
    yield timeout(300);
    for(const hourSpec of (yield localBusiness.openingHoursSpecifications).toArray()){
      yield hourSpec.save();
    }
    for(const category of (yield localBusiness.categories).toArray()){
      yield category.save();
    }
    localBusiness.modified = new Date();
    yield (yield localBusiness.location).save();
    yield localBusiness.save();
  }

  @action
  toggleCodeBlock(){
    this.displayCodeBlock = !this.displayCodeBlock;
  }

  @action
  back(){
    this.transitionToRoute(this.overviewRoute);
  }

  @action
  save(localBusiness){
    this.saveAll.perform(localBusiness);
    this.hasSaved = true;
  }

}
