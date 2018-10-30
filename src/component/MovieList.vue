<template>
    <div id="movie-list">
        <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie"></movie-item>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import MovieItem from './MovieItem.vue';
    export default {
        props: ['genre', 'time', 'movies'], // refer to the parent's data properties, and can be used in this child component.
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
        },
        components: {
            MovieItem
        }
    }
</script>