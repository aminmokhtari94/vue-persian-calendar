<template>
  <div :class="classObject" @click="captureClick">
    <div><span>{{ day.format('D') }}</span></div>
    <ul class="event-list">
<!--        <li v-for="event in events" :key="event">{{ event.description }}</li>-->
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
      return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'))
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
    captureClick (event) {
      this.$store.commit('eventFormPos', { x: event.clientX, y: event.clientY })
      this.$store.commit('eventFormActive', true)
      this.$store.commit('eventFormDate', this.day)
    }
  }
}
</script>
