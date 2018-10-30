import Vue from 'vue';
import './style.scss';

import MovieList from './component/MovieList.vue'; // import a single file component: var name MovieList will be put under components
import MovieFilter from './component/MovieFilter.vue';

import VueResource from 'vue-resource'; // the tool making api(ajax) call
Vue.use(VueResource);

//Adding moment-timezone lib
import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', {get() { return this.$root.moment}}); // a method to add an existing property into all vue objects.

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment
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
        MovieList,
        MovieFilter
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });
    }
});