import Component from '@ember/component';

export default class UiHooksComponent extends Component {
  'did-insert'() {};

  didInsertElement(){
    if( this['did-render'] ) this['did-render']();
  }
}
