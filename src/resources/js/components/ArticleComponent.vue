<template>
    <div class="container">
        <h1>{{ hello }}</h1>
        <h2>My name is {{ name }}, {{ fullname }}</h2>
        <h2>{{ helloToUper }}</h2>
        <h3>{{ sum(6, 8) }}</h3>
        <img :src="img" alt="">
        <p v-if="true">True</p>
        <ul>
            <li v-for="(index, car) in this.cars">
                {{ index }} - {{ cars }}
            </li>
        </ul>
    </div>
</template>

<script>
import store from "../store";

export default {
    data() {
        return {
            hello: 'Hello world',
            img: 'https://via.placeholder.com/600/5F1138/FFFFFF/?text=Laravel:8.*',
            cars: ['BMW', 'Nissan', 'Volvo']
        }
    },
    computed: {
        helloToUper() {
            return this.hello.toUpperCase();
        },
        fullname() {
            return store.getters.getFullName;
        },
        name() {
            return store.state.firstname;
        }
    },
    methods: {
        sum(a, b) {
            return a +b;
        }
    },
    mounted() {
        console.log('Component mounted.')
    }
}
</script>

<style scoped>

</style>
