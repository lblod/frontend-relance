import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | entrepreneurs/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:entrepreneurs/index');
    assert.ok(route);
  });
});
