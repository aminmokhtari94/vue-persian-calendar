<template>
    <div>
        <div id="app">
            <persian-calendar
                    :event-list="events"
                    :show-date="$moment('1399/05/26', 'jYYYY/jMM/jDD')"
                    :display-period.sync="dp"
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
        {id:1, startDateTime:this.$moment('1399/05/07 19:30', 'jYYYY/jMM/jDD HH:mm'), endDateTime:this.$moment('1399/05/09 07:15', 'jYYYY/jMM/jDD HH:mm'), description:'رویداد شماره ۱', color:'#2a79b8', classes: []},
        {id:2, startDateTime:this.$moment('1399/05/13 10:30', 'jYYYY/jMM/jDD HH:mm'), endDateTime:this.$moment('1399/05/13 15:00', 'jYYYY/jMM/jDD HH:mm'), description:'رویداد شماره ۲', color:'#a71749', classes: []},
        {id:7, startDateTime:this.$moment('1399/05/13 10:30', 'jYYYY/jMM/jDD HH:mm'), endDateTime:this.$moment('1399/05/13 11:30', 'jYYYY/jMM/jDD HH:mm'), description:'گفتگوی اسکایپی با مدیر شرکت آرمان', color:'#a71749', classes: []},
        {id:4, startDateTime:this.$moment('1399/05/09 10:30', 'jYYYY/jMM/jDD HH:mm'), endDateTime:this.$moment('1399/05/13 14:00', 'jYYYY/jMM/jDD HH:mm'), description:'رویداد شماره ۳', color:'#34147e', classes: []},
        {id:5, startDateTime:this.$moment('1399/05/06 10:30', 'jYYYY/jMM/jDD HH:mm'), endDateTime:this.$moment('1399/05/08 18:35', 'jYYYY/jMM/jDD HH:mm'), description:'رویداد شماره ۴', color:'#34147e', classes: []},
        {id:3, startDateTime:this.$moment('1399/05/10', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/25', 'jYYYY/jMM/jDD'), description:'گفتگوی اسکایپی با مدیر شرکت آرمان', color:'#cb09cb', classes: []}
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