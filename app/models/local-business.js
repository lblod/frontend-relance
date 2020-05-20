import { get } from '@ember/object';
import Model, {attr, belongsTo, hasMany} from '@ember-data/model';
import sizedImageUrl from 'frontend-relance/utils/sized-image-url';

export default class LocalBusinessModel extends Model {
  @attr uri;
  @attr name;
  @attr description;
  @attr url;
  @attr imageUrl;
  @attr email;
  @attr telephone;

  @hasMany('opening-hours-specification') openingHoursSpecifications;
  @hasMany('nace-bel-code') naceBelCodes;
  @belongsTo('location') location;
  @hasMany('category') categories;
  @belongsTo('file') imageFile;

  get displayImageUrl(){
    if( get(this,"imageUrl") ){
      return get(this,"imageUrl");
    }
    else {
      if ( get(this,"imageFile.id") ){
        const imageFileId = get(this, "imageFile.id");
        console.log(sizedImageUrl);
        return  sizedImageUrl( imageFileId, { width: 800, height: 800 } );
      }
    }
    return;
  }
}
