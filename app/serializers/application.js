import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {
  serializeAttribute(snapshot, json, key, attributes) {
    if (key !== 'uri')
      this._super(snapshot, json, key, attributes);
  }
}
