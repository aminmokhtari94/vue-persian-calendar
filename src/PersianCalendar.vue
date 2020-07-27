<template>
    <div id="persian-calendar">
      <div id="vpc_header" slot="header">
        <div id="vpc_date-control">
          <div class="vpc_control-btn" @click="subtractMonth">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
          <span class="vpc_now-date">{{currentDate.locale('fa').format('jMMMM jYYYY')}}</span>
          <div class="vpc_control-btn" @click="addMonth">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </div>
          <div class="vpc_today-btn" @click="goToday">امروز</div>
        </div>
      </div>
      <transition
              :name="transitionAction"
              @after-leave="afterLeave"
      >
        <div v-if="currentDateChange">
          <div id="vpc_calendar">
            <!--DAYS HEADER-->
            <div id="vpc_days-header">
              <div>شنبه</div>
              <div>یکشنبه</div>
              <div>دوشنبه</div>
              <div>سه شنبه</div>
              <div>چهار شنبه</div>
              <div>پنج شنبه</div>
              <div>جمعه</div>
            </div>
            <div v-for="week in weeks" :key="week.uid" class="vpc_week">
              <div v-for="day in week" :key="day.uid" :class="dayClassObject(day)" @click="$emit('on-day-click', day)">
                <div class="vpc_day-number">{{ day.format('D').toPersianDigits() }}</div>
                <ul class="vpc_event-list">
                  <li
                      v-for="event in events.filter(e => e.date.isSame(day, 'day'))"
                      :key="event.description"
                      class="vpc_event"
                      @click.stop="$emit('on-event-click', event)"
                  >
                    <div :style="{'background-color':event.color}" class="vpc_event-ball"></div>
                    <span class="vpc_event-time">{{ event.startTime.format('HH:mm').toPersianDigits() }}</span>
                    <span class="vpc_event-description">{{ event.description }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'PersianCalendar',
  data () {
    return {
      currentDate: null,
      currentDateChange: true,
      transitionAction: 'slide-right',
      addEventModalShow: false
    }
  },
  computed:{
    month:{
      get () {
        return this.currentDate.format('jM')
      },
      set (value) {
        this.currentDate = value
      }
    },
    year: {
      get () {
        return this.currentDate.format('jYYYY')
      },
      set (value) {
        this.currentDate = value
      }
    },
    days () {
      // Generating all days in current month
      const days = []
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'jYYYY-jM-jD').locale('fa')
      do {
        days.push(currentDay)
        currentDay = this.$moment(currentDay).add(1, 'days')
      } while (this.$moment(currentDay).format('M') === this.month)
      // Add previous days to start
      currentDay = this.$moment(days[0])
      const SHANBE = 0
      const YEK_SHANBE = 1
      if (currentDay.jDay() !== SHANBE) {
        do {
          currentDay = this.$moment(currentDay).subtract(1, 'days')
          days.unshift(currentDay)
        } while (currentDay.jDay() !== SHANBE)
      }
      // Add following days to end
      currentDay = this.$moment(days[days.length - 1])
      if (currentDay.jDay() !== YEK_SHANBE) {
        do {
          currentDay = this.$moment(currentDay).add(1, 'days')
          days.push(currentDay)
        } while (currentDay.jDay() !== YEK_SHANBE)
      }
      return days
    },
    weeks () {
      const weeks = []
      let week = []
      for (let i = 0; i < this.days.length; i++) {
        week.push(this.days[i])
        if (week.length === 7) {
          weeks.push(week)
          week = []
        }
      }
      return weeks
    },
    events () {
      return [
        {date:this.$moment(), startTime:this.$moment(), endTime:this.$moment(), description:'امین مختاری'},
        {date:this.$moment().add(10, 'days'), startTime:this.$moment(), endTime:this.$moment(), description:'ali'}
      ]
    }
  },
  watch: {
    currentDate () {
      this.currentDateChange = false
    }
  },
  created () {
    this.currentDate = this.$moment()
  },
  methods:{
    addMonth () {
      this.transitionAction = 'slide-left'
      this.currentDate = this.$moment(this.currentDate).add(1, 'month')
    },
    subtractMonth () {
      this.transitionAction = 'slide-right'
      this.currentDate = this.$moment(this.currentDate).subtract(1, 'month')
    },
    goToday () {
      if (this.currentDate.isBefore(this.$moment(), 'month')) {
        this.transitionAction = 'slide-left'
        this.currentDate = this.$moment()
      } else if (this.currentDate.isAfter(this.$moment(), 'month')) {
        this.transitionAction = 'slide-right'
        this.currentDate = this.$moment()
      }
    },
    dayClassObject (day) {
      // const eventFormDate = this.$store.state.eventFormDate
      // const eventFormActive = this.$store.state.eventFormActive
      const today = day.isSame(this.$moment(), 'day')
      return {
        'vpc_day': true,
        'vpc_today': today,
        'vpc_past': day.isSameOrBefore(this.$moment(), 'day') && !today,
        'vpc_not-current-month': !day.isSame(this.currentDate, 'month')
      }
    },
    onDayClick (day) {
      this.$emit('on-day-click', day)
    },
    onEventClick (event) {
      this.$emit('on-event-click', event)
    },
    // Transition show month after fade out
    afterLeave () {
      this.currentDateChange = true
    }
  }
}
</script>
<style lang="sass">
  @import "assets/style"
</style>
