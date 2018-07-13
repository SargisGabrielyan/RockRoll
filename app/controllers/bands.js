import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Controller.extend({
    name: '',
    isAddButtonDisabled: computed('name', function() {
        return isEmpty(this.get('name'));
    })
});
