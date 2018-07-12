import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { on } from '@ember/object/evented';

export default EmberObject.extend({
    name: '',
    slug: computed('name', function() {
        return this.get('name').dasherize();
    }),

    setupSongs: on('init', function() {
        if (!this.get('songs')) {
            this.set('songs', []);
        }
    }),
});
