import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
    el: '#app',
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
                checkFilter(){ // when the actual check-filter checkbox is clicked
                    console.log('check filter');
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
                            this.$emit('check-filter');
                        }
                    }
                }
            }
        }
    }
});