import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class EntrepreneursEditStep1Controller extends Controller {

  async saveAll(localBusiness){
    for(const hourSpec of (await localBusiness.openingHoursSpecifications).toArray()){
      await hourSpec.save();
    }
    for(const category of (await localBusiness.categories).toArray()){
      await category.save();
    }
    await (await localBusiness.location).save();
  }

  @action
  async nextStep(localBusiness){
    await this.saveAll(localBusiness);
    this.transitionToRoute('entrepreneurs.edit.step-2', localBusiness);
  }

}
