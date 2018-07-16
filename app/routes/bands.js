import Route from '@ember/routing/route';
import wait from '../utils/wait';




export default Route.extend({
    model: function() {
        var bands = this.store.findAll('band');
        return wait(bands, 3 * 10);
    },
    actions: {
        didTransition: function() {
            document.title = 'Bands - Rock & Roll';
        },
        createBand: function() {
            // var name = this.get('controller').get('name');
            // var band = Band.create({ name: name });
            // this.modelFor('bands').pushObject(band);
            // // bands.get('content').pushObject(band);
            // this.get('controller').set('name', '');
            //this.transitionTo('bands.band.songs', band)

            var route = this,
                controller = this.get('controller');
            var band = this.store.createRecord('band',
            controller.getProperties('name'));
            band.save().then(function() {
                controller.set('name', '');
                route.transitionTo('bands.band.songs', band);
            });
        }
    }
});
