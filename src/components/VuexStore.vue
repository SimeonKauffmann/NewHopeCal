<template>
    <div class="VueXStore">
        <h1> {{ msg }} </h1>
        <button v-on:click="checkData"></button>

        <h2> Today Special day is {{ SpecialDay }} at {{ dateDay }}. </h2> 
        <div v-for="holiday in holidays" :key="holiday.id">
            <dl> 
                    {{holiday.date}} 
                    {{holiday.localName}} 
                    {{holiday.name}}
            </dl>    
        </div>

    </div>
</template>



<script>

export default {
    name: "VueX",
    data () {
        return {
            msg: "A test Vuex",
            SpecialDay: "[Unknown]",
            dateDay: "[REACTED]"
        }
    },

    computed: {
        holidays() {
            // return this data from index.js store
            return this.$store.state.publicHoliday
        }
    },

    mounted() {
        // get data from index.js store in actions
        this.$store.dispatch("getHoliday")
    },

    methods: {
        checkData: function() {
            let calander = this.$store.state.publicHoliday

            for (let i = 0; i < calander.length; i++){
                if (calander[i].date === "2021-05-01"){
                    // console.log(calander[i].localName)
                    this.SpecialDay = calander[i].localName
                    this.dateDay = calander[i].date
                }
            }
            
        }
    }
}

</script>



<style scoped>
dl {
    border-radius: 50px;
    border: 5px solid black;
    padding: 50px;
    margin: 20px;
    font-size: 120%;
}
</style>