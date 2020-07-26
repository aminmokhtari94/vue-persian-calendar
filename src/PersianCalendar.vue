<template>
    <div id="persian-calendar">
      <div id="vpc_header" slot="header">
        <div id="vpc_date-control">
          <div class="vpc_control-btn" @click="subtractMonth">
            <v-icon name="chevron-right"></v-icon>
          </div>
          <span class="vpc_now-date">{{currentDate.format('jMMMM jYYYY')}}</span>
          <div class="vpc_control-btn" @click="addMonth">
            <v-icon name="chevron-left"></v-icon>
          </div>
          <div class="vpc_today-btn" @click="goToday">امروز</div>
        </div>
      </div>
      <transition
              :name="transitionAction"
              @after-leave="afterLeave"
      >
        <div v-if="startTransition">
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
              <Day v-for="day in week" :key="day.uid" :day="day" :current-date="currentDate"></Day>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import Day from './components/Day.vue'

export default {
  name: 'PersianCalendar',
  data () {
    return {
      currentDate: null,
      startTransition: true,
      transitionAction: 'slide-right'
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
    }
  },
  watch: {
    currentDate () {
      this.startTransition = false
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
    // Transition show month after fade out
    afterLeave () {
      this.startTransition = true
    }
  },
  components: {
    Day
  }
}
</script>
