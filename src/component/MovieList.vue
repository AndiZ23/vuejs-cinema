<template>
    <div id="movie-list">
        <div v-for="movie in filteredMovies" class="movie">{{ movie.movie.Title }}, {{ movie.movie.Genre }}</div>
    </div>
</template>
<script>
    import genres from '../util/genres';
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
        }
    }
</script>