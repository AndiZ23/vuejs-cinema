<template>
    <div id="movie-filter">
        <h2>Filter results</h2>
        <h3>By time of day</h3>
        <div class="filter-group">
            <check-filter v-for="time in times" category="time" v-bind:title="time" v-on:check-filter="checkFilter"></check-filter>
        </div>
        <h3>By genre</h3>
        <div class="filter-group">
            <!-- put the v-on:event-ownerName="methodName" into the child/event-owner component element
                 so this parent component can listen to the event.-->
            <check-filter v-for="genre in genres" category="genre" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
        </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import CheckFilter from './CheckFilter.vue';
    export default {
        data() {
            return {
                genres,
                times
            };
        },
        methods: {
            // Once the event triggered, this method with the same name gets fired as well
            checkFilter(category, title, checked){ // Triggers when the actual check-filter checkbox is clicked
            this.$emit('check-filter', category, title, checked);
            }
        },
        components: { // components inside a component
            CheckFilter
        }
    }
</script>