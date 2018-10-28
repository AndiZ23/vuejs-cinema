<template>
    <div id="movie-list">
        <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}, {{ movie.genre }}</div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    export default {
        data: function() { // we need to assign a function to it, which returns an object with the data
            return {
                movies: [
                    { title: 'Kill Bill', genre: genres.CRIME },
                    { title: 'Home Alone', genre: genres.COMEDY },
                    { title: 'Austin Power 2', genre: genres.COMEDY }
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
    }
</script>