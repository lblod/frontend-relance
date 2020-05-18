import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | entrepreneurs/edit/step-3', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:entrepreneurs/edit/step-3');
    assert.ok(route);
  });
});
