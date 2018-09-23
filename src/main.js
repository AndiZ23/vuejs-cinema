import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: []
    },
    methods: {
        checkFilter(category, title, checked){ // this one will be fired when the checkFilter from the very child comp. is triggered.
            if(checked){
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if (index > -1){
                    this[category].splice(index, 1);
                }
            }
        }
    },
    components: { // registering Vue components, can have many properties of Vue
        'movie-list': {
            template: `<div id="movie-list">
                            <div v-for="movie in movies" class="movie">{{ movie.title }}</div>
                        </div>`,
            data: function() { // we need to assign a function to it, which returns an object with the data
                return {
                    movies: [
                        { title: 'Pulp Fiction' },
                        { title: 'Home Alone' },
                        { title: 'Austin Power' }
                    ]
                };
            }
        },
        'movie-filter': {
            data() {
              return {
                  genres
              };
            },
            template: `<div id="movie-filter">
                            <h2>Filter results</h2>
                            <div class="filter-group">
                                <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
                            </div>
                        </div>`,
            methods: {
                checkFilter(category, title, checked){ // Triggers when the actual check-filter checkbox is clicked
                    // In depth: when the check-filter's checkFilter event is triggered, the movie-filter (parent) triggers this event
                    // method too. Likewise, the root element (parent of this comp) listens to / receive this event too.
                    console.log('check filter');
                    this.$emit('check-filter', category, title, checked);
                }
            },
            components: { // components inside a component
                'check-filter':{
                    data() {
                        return {
                            checked: false
                        }
                    },
                    template: `<div v-bind:class="{ 'check-filter': true, active: checked}" v-on:click="checkFilter">
                                    <span class="checkbox"></span>
                                    <span class="check-filter-title">{{ title }}</span>
                                </div>`,
                    props: ['title'],
                    methods: { // put custom events under methods
                        checkFilter(){
                            this.checked = !this.checked;
                            this.$emit('check-filter', 'genre', this.title, this.checked);
                        }
                    }
                }
            }
        }
    }
});