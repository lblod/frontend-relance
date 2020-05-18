import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | entrepreneurs/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:entrepreneurs/new');
    assert.ok(route);
  });
});
