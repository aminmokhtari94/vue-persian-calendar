<template>
    <div id="persian-calendar">
      <div class="flex flex-row bg-gray-200">
  <div class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">1</div>
  <div class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">2</div>
  <div class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">3</div>
</div>
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <!-- ... -->
  <div>9</div>
</div>
      <div class="vx-row m-5" >
        <div class="flex items-center" style="width: 100px">
          <span class="cursor-pointer bg-primary text-white rounded-full feather-icon select-none relative" @click="subtractMonth">
            <v-icon name="chevron-left"></v-icon>
          </span>
          
          <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{currentDate.format('jMMMM jYYYY')}}</span>
          <span class="cursor-pointer bg-primary text-white rounded-full feather-icon select-none relative" @click="addMonth">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="feather feather-chevron-left w-5 h-5 m-1">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </span>
        </div>
      </div>
      <!--DAYS HEADER-->
      <div  id="days-header">
        <div>شنبه</div>
        <div>یکشنبه</div>
        <div>دوشنبه</div>
        <div>سه شنبه</div>
        <div>چهار شنبه</div>
        <div>پنج شنبه</div>
        <div>جمعه</div>
      </div>

      <div v-for="week in weeks" :key="week.uid" class="calendar-week">
        <Day v-for="day in week" :key="day.uid" :day="day"></Day>
      </div>
    </div>
</template>

<script>
import Day from './components/Day.vue'

export default {
  name: 'PersianCalendar',
  data () {
    return {
      currentDate: null
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
  created () {
    this.currentDate = this.$moment()
  },
  methods:{
    addMonth () {
      this.currentDate = this.$moment(this.currentDate).add(1, 'month')
    },
    subtractMonth () {
      this.currentDate = this.$moment(this.currentDate).subtract(1, 'month')
    }
  },
  components: {
    Day
  }
}
</script>
