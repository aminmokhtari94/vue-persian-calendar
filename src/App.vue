<template>
    <div>
        <div id="app">
            <input type="text" v-model="dp"/>
            {{dp}}
            <persian-calendar
                    :event-list="events"
                    :show-date="$moment().add(1,'months')"
                    :display-period.sync="dp"
                    disable-control
                    disable-period
                    disable-today
                    hide-event-times
            > </persian-calendar>
        </div>
    </div>
</template>

<script>
import PersianCalendar from './PersianCalendar.vue'

export default {
  components:{
    PersianCalendar
  },
  data () {
    return {
      dp:'week',
      events:[
        {id:1, startDateTime:this.$moment('1399/05/07', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/09', 'jYYYY/jMM/jDD'), description:'7-9', color:'#2a79b8', classes: []},
        {id:2, startDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), description:'سلام خسته نباشید این  یک متن است. یکی متن طولانی برای تست', color:'#a71749', classes: []},
        {id:7, startDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), description:'سلام خسته نباشید این  یک متن است. یکی متن طولانی برای تست', color:'#a71749', classes: []},
        {id:4, startDateTime:this.$moment('1399/05/09', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/13', 'jYYYY/jMM/jDD'), description:'9-13', color:'#34147e', classes: []},
        {id:5, startDateTime:this.$moment('1399/05/06', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), description:'asd', color:'#34147e', classes: []},
        // {id:6, startDateTime:this.$moment('1399/05/01', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/20', 'jYYYY/jMM/jDD'), description:'1-20', color:'#34147e', classes: []},
        {id:3, startDateTime:this.$moment('1399/05/10', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/25', 'jYYYY/jMM/jDD'), description:'sd', color:'#cb09cb', classes: []}
      ]
    }
  }
}
</script>

<style lang="scss">
#app {
  padding: 30px;
}
</style>