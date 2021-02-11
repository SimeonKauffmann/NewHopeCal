<template>
    <div class="BasicFetch">
        <!-- This is a fetch test run and v-for to loop a list from API. -Patrik -->
        <button v-on:click="checkList">Chech Holiday Fetch</button>

        <div v-if="HolidayList">
            <dl v-for="Holiday in HolidayList" :key="(Holiday.date, Holiday.localName, Holiday.name)">
                <!-- Date Number exampel 2020-05-20 -->
                <date> {{ Holiday.date }} </date>

                <!-- Date name in Swedish exampel Nyårsdagen -->
                <sweName> {{ Holiday.localName }}</sweName>

                <!-- Date name in English exampel New Year's Day -->
                <enName> {{Holiday.name }}</enName>
            </dl>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            HolidayList: null,
        }
    },

    created() {

        // Vue.axios.get("/api/v2/publicholidays/2021/SE")
        const axios = require("axios")
        axios.get("/api/v2/publicholidays/2021/SE")
        .then((response) => {
            this.HolidayList = response.data
        })
        
    },
    methods: {
        checkList: function(){
            console.log(this.HolidayList)
        }
    },
}
</script>

<style scoped>
dl {
    border: 5px solid black;
    padding: 50px;
    margin: 20px;
}
</style>