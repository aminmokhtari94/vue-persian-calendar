<template>
  <div :class="classObject" @click="captureClick(day)">
    <div class="vpc_day-number"><span>{{ day.format('D') }}</span></div>
    <ul class="vpc_event-list">
        <li v-for="event in events" :key="event.description" class="vpc_event" @click="eventClick(event)">
          <span>&#x25CF; </span>{{ event.startTime.format('HH:mm') }}-{{ event.endTime.format('HH:mm') }}: {{ event.description }}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Day',
  props:{
    day: Object,
    currentDate: Object
  },
  computed: {
    events () {
      // return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'))
      return [
        {date:this.day, startTime:this.day, endTime:this.day, description:'amin'},
        {date:this.day, startTime:this.day, endTime:this.day, description:'ali'}
      ]
    },
    classObject () {
      // const eventFormDate = this.$store.state.eventFormDate
      // const eventFormActive = this.$store.state.eventFormActive
      const today = this.day.isSame(this.$moment(), 'day')
      return {
        'vpc_day': true,
        'vpc_today': today,
        'vpc_past': this.day.isSameOrBefore(this.$moment(), 'day') && !today,
        'vpc_not-current-month': !this.day.isSame(this.currentDate, 'month')
      }
    }
  },
  methods: {
    captureClick (day) {
      return day
      // console.log('day', day.format())
    },
    eventClick (event) {
      return event
      // console.log('event', event)
    }
  }
}
</script>
