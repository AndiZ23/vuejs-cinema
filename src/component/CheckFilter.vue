<template>
    <!-- put v-on and how the event will be triggered (click) in the event-owner template, which is the starting point of the event. -->
    <div v-bind:class="{ 'check-filter': true, active: checked}" v-on:click="checkFilter">
        <span class="checkbox"></span>
        <span class="check-filter-title">{{ title }}</span>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                checked: false
            }
        },
        props: ['title', 'category'],
        methods: { // put custom events under methods
            checkFilter(){ // point of creating an event: changing and passing data upward.
                this.checked = !this.checked;
                this.$emit('check-filter', this.category, this.title, this.checked);
            }
        }
    }
</script>