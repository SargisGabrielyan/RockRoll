import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { capitalize } from '../../../helpers/capitalize';

export default Controller.extend({
    queryParams: {
        sortBy: 'sort',
        searchTerm: 's',
    },
    songCreationStarted: false,
    title: '',
    isAddButtonDisabled: computed('title', function() {
        return isEmpty(this.get('title'));
    }),
    canCreateSong: computed('songCreationStarted', 'model.songs.length', function() {
        return this.get('songCreationStarted') || this.get('model.songs.length');
    }),
    sortBy: 'ratingDesc',
    sortProperties: computed('sortBy', function() {
        var options = {
            'ratingDesc': 'rating:desc,title:asc',
            'ratingAsc': 'rating:asc,title:asc',
            'titleDesc': 'title:desc',
            'titleAsc': 'title:asc',
        };
        return options[this.get('sortBy')].split(',');
    }),
    sortedSongs: computed.sort('matchingSongs', 'sortProperties'),
    searchTerm: '',
    matchingSongs: computed('model.songs.@each.title', 'searchTerm', function() {
        var searchTerm = this.get('searchTerm').toLowerCase();
        return this.get('model.songs').filter(function(song) {
            return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
        });
    }),
    newSongPlaceholder: computed('model.name', function() {
        var bandName = this.get('model.name');
        return `New ${capitalize(bandName)} song`;
    }),
    actions: {
        enableSongCreation: function() {
            this.set('songCreationStarted', true);
        },
        updateRating: function(song, rating) {
            if (song.get('rating') === rating) {
                rating = 0;
            }
            song.set('rating', rating);
            return song.save();
        },
        setSorting: function(option) {
            this.set('sortBy', option);
        },
    }
});
