<template>
  <div id="app">
    <persian-calendar
      :events-list="events"
      :display-period.sync="period"
      @on-day-click="addEvent"
    >
    </persian-calendar>
    <h2>Current Display Period {{period}}</h2>
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
      period:'week',
      min: this.$moment('1399/05/20', 'jYYYY/jMM/jDD'),
      max:'1399/05/21',
      id:90,
      events:[
        {id:1, 
          startDateTime:this.$moment('2020-09-06T13:37:41.020+04:30'),
          endDateTime:this.$moment('2020-09-07T00:49:41.020+04:30'),
          title:'رویداد شماره ۱',
          color:'#2a79b8',
          classes: ['asd', '123']},
        {id:2, 
          startDateTime:this.$moment('1399/05/01 10:30', 'jYYYY/jMM/jDD HH:mm'),
          endDateTime:this.$moment('1399/05/01 15:00', 'jYYYY/jMM/jDD HH:mm'),
          title:'رویداد شماره ۲',
          color:'#a71749',
          classes: []},
        {id:7, 
          startDateTime:this.$moment('1399/04/30 23:30', 'jYYYY/jMM/jDD HH:mm'),
          endDateTime:this.$moment('1399/05/03 00:30', 'jYYYY/jMM/jDD HH:mm'),
          title:'گفتگوی اسکایپی با مدیر شرکت آرمان',
          color:'#a71749'},
        {id:4, 
          startDateTime:this.$moment('1399/05/09 10:30', 'jYYYY/jMM/jDD HH:mm'),
          endDateTime:this.$moment('1399/05/13 14:00', 'jYYYY/jMM/jDD HH:mm'),
          title:'رویداد شماره ۳',
          color:'#34147e',
          classes: []},
        {id:5, 
          startDateTime:this.$moment('1399/05/06 10:30', 'jYYYY/jMM/jDD HH:mm'),
          endDateTime:this.$moment('1399/05/08 18:35', 'jYYYY/jMM/jDD HH:mm'),
          title:'رویداد شماره ۴',
          color:'#34147e',
          classes: []},
        {id:3, 
          startDateTime:this.$moment('1399/05/10', 'jYYYY/jMM/jDD'),
          endDateTime:this.$moment('1399/05/25', 'jYYYY/jMM/jDD'),
          title:'گفتگوی اسکایپی با مدیر شرکت آرمان',
          color:'#cb09cb',
          classes: []}
      ]
    }
  },
  methods: {
    addEvent (day) {
      this.id += 1
      // console.log(day.format())
      this.events.push({
        id: this.id,
        title: 'test',
        startDateTime: this.$moment(day),
        endDateTime: this.$moment(day)
      })
      
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: Vazir;
  src: url('~vazir-font/dist/Vazir.eot');
  src: url('~vazir-font/dist/Vazir.eot?#iefix') format('embedded-opentype'),
  url('~vazir-font/dist/Vazir.woff2') format('woff2'),
  url('~vazir-font/dist/Vazir.woff') format('woff'),
  url('~vazir-font/dist/Vazir.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: Vazir;
  src: url('~vazir-font/dist/Vazir-Bold.eot');
  src: url('~vazir-font/dist/Vazir-Bold.eot?#iefix') format('embedded-opentype'),
  url('~vazir-font/dist/Vazir-Bold.woff2') format('woff2'),
  url('~vazir-font/dist/Vazir-Bold.woff') format('woff'),
  url('~vazir-font/dist/Vazir-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

#app {
  font-family: Vazir,serif;
  padding: 30px;
}
</style>