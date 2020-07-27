<template>
  <div :class="classObject" @click="$emit('on-day-click', day)">
    <div class="vpc_day-number">{{ day.format('D').toPersianDigits() }}</div>
    <ul class="vpc_event-list">
      <li v-for="event in events" :key="event.description" class="vpc_event" @click.stop="$emit('on-event-click', event)">
        <div :style="{'background-color':event.color}" class="vpc_event-ball"></div>
        <span class="vpc_event-time">{{ event.startTime.format('HH:mm').toPersianDigits() }}</span>
        <span class="vpc_event-description">{{ event.description }}</span>
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
        {date:this.day, startTime:this.day, endTime:this.day, description:'امین مختاری'},
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
  }
}
</script>
