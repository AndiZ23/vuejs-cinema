import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: []
    },
    methods: { // put v-on:check-filter="checkFilter" into <movie-filter> in HTML, so this root element can listen to the event too.
        checkFilter(category, title, checked){ // this one will be fired when the checkFilter from the very child comp is triggered.
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
                            <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}, {{ movie.genre }}</div>
                        </div>`,
            data: function() { // we need to assign a function to it, which returns an object with the data
                return {
                    movies: [
                        { title: 'Pulp Fiction', genre: genres.CRIME },
                        { title: 'Home Alone', genre: genres.COMEDY },
                        { title: 'Austin Power', genre: genres.COMEDY }
                    ]
                };
            },
            props: ['genre', 'time'], // refer to the parent's data properties, and can be used in this child component.
            methods: {
                moviePassesGenreFilter(movie){
                    if (!this.genre.length)
                        return true;
                    else
                        return this.genre.find(genre => movie.genre === genre);
                }
            },
            computed: {
                filteredMovies() {
                    return this.movies.filter(this.moviePassesGenreFilter);
                }
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
                                <!-- put the v-on:event-ownerName="methodName" into the child/event-owner component element 
                                     so this parent component can listen to the event.-->
                                <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
                            </div>
                        </div>`,
            methods: {
                // Once the event triggered, this method with the same name gets fired as well
                checkFilter(category, title, checked){ // Triggers when the actual check-filter checkbox is clicked
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
                    template:  `<div v-bind:class="{ 'check-filter': true, active: checked}" v-on:click="checkFilter"> 
                                    <!-- put v-on and how the event will be triggered (click) in the event-owner template,
                                         which is the starting point of the event. -->
                                    <span class="checkbox"></span>
                                    <span class="check-filter-title">{{ title }}</span>
                                </div>`,
                    props: ['title'],
                    methods: { // put custom events under methods
                        checkFilter(){ // point of creating an event: changing and passing data upward.
                            this.checked = !this.checked;
                            this.$emit('check-filter', 'genre', this.title, this.checked);
                        }
                    }
                }
            }
        }
    }
});