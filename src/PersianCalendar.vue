<template>
    <div id="persian-calendar">
      <!--CALENDAR HEADER-->
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
      <!--CALENDAR GRID-->
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
            <!--WEEKS ROW-->
            <div
                v-for="week in weeks"
                :key="week.uid"
                class="vpc_week"
            >
                <template v-for="i in getWeekEvents(week[0].startOf('jWeek'))">
                    <slot
                            :value="i"
                            :weekStartDate="$moment(week).startOf('jWeek')"
                            :top="getEventTop(i)"
                            name="event"
                    >
                        <div
                                :key="i.id"
                                :class="i.classes"
                                :title="i.title"
                                :style="`top:${getEventTop(i)};background-color:${i.color};`"
                                class="vpc_event"
                        >
                            <div :style="{'background-color':i.color}" class="vpc_event-ball"></div>
                            <span class="vpc_event-start-time">{{ i.startDateTime.format('HH:mm').toPersianDigits() }}</span>
                            <span class="vpc_event-start-date">{{ i.startDateTime.format('jMM/jDD').toPersianDigits() }}</span>
                            <span class="vpc_event-description">{{ i.description }}</span>
                            <span class="vpc_event-end-time">{{ i.endDateTime.format('HH:mm').toPersianDigits() }}</span>
                            <span class="vpc_event-end-date">{{ i.endDateTime.format('jMM/jDD').toPersianDigits() }}</span>
                        </div>
                    </slot>
                </template>
              <!--DAYS-->
              <div
                  v-for="day in week"
                  :key="day.uid"
                  :class="dayClassObject(day)"
                  @click="$emit('on-day-click', day)"
              >
                <div class="vpc_day-number">{{ day.format('D').toPersianDigits() }}</div>
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
        {id:1, startDateTime:this.$moment('1399/05/07', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/09', 'jYYYY/jMM/jDD'), description:'7-9', color:'#2a79b8', classes: []},
        {id:2, startDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), description:'8-8', color:'#a71749', classes: []},
        {id:21, startDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), description:'8-8', color:'#a71749', classes: []},
        {id:22, startDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), description:'8-8', color:'#a71749', classes: []},
        {id:4, startDateTime:this.$moment('1399/05/09', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/13', 'jYYYY/jMM/jDD'), description:'9-13', color:'#34147e', classes: []},
        {id:5, startDateTime:this.$moment('1399/05/06', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/08', 'jYYYY/jMM/jDD'), description:'asd', color:'#34147e', classes: []},
        {id:6, startDateTime:this.$moment('1399/05/01', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/20', 'jYYYY/jMM/jDD'), description:'1-20', color:'#34147e', classes: []},
        {id:3, startDateTime:this.$moment('1399/05/10', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/25', 'jYYYY/jMM/jDD'), description:'sd', color:'#cb09cb', classes: []}
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
    // console.log(this.$moment().startOf('jWeek').locale('fa').format('YYYY-M-D HH:mm:ss'))
    // this.getWeekEvents(this.$moment().startOf('jWeek'))
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
    // Transition show month after fade out
    afterLeave () {
      this.currentDateChange = true
    },

    eventComparer (a, b) {
      if (a.startDateTime.isBefore(b.startDateTime)) return -1
      if (b.startDateTime.isBefore(a.startDateTime)) return 1
      if (a.endDateTime.isAfter(b.endDateTime)) return -1
      if (b.endDateTime.isAfter(a.endDateTime)) return 1
      return a.id < b.id ? -1 : 1
    },
    findAndSortEventsInWeek (weekStart) {
      // Return a list of events that INCLUDE any portion of a given week.
      return this.findAndSortEventsInDateRange(
        weekStart, this.$moment(weekStart).hours(23).minutes(59).seconds(59).add(6, 'days')
      )
    },
    findAndSortEventsInDateRange (startDateTime, endDateTime) {
      // Return a list of events that INCLUDE any day within the date range,
      // inclusive, sorted so events that start earlier are returned first.
      return this.events
        .filter(
          // (event) => event.endDateTime >= startDateTime && this.dateOnly(event.startDateTime) <= endDateTime,
          (event) => event.endDateTime.isSameOrAfter(startDateTime) && event.startDateTime.isSameOrBefore(endDateTime),
          this
        )
        .sort(this.eventComparer)
    },
    dayHasEvents (day) {
      return this.events.find(
        (d) => d.endDateTime.isSameOrAfter(day) && d.startDateTime.isSameOrBefore(day)
      )
    },
    dayEvents (day) {
      return this.events.filter(
        (d) => d.endDateTime.isSameOrAfter(day) && d.startDateTime.isSameOrBefore(day)
      )
        .sort(this.eventComparer)
    },
    dayIsSelected (day) {
      if (!this.selectionStart || day < this.selectionStart) return false
      return !(!this.selectionEnd || day > this.selectionEnd)
    },
    getWeekEvents (weekStart) {
      // Return a list of events that CONTAIN the week starting on a day.
      // Sorted so the events that start earlier are always shown first.
      const events = this.findAndSortEventsInWeek(weekStart.startOf('day'))
      const results = []
      const eventRows = [[], [], [], [], [], [], []]
      for (let i = 0; i < events.length; i++) {
        const ep = Object.assign({}, events[i], {
          classes: [...events[i].classes],
          eventRow: 0
        })
        const continued = ep.startDateTime.isBefore(weekStart)
        const startOffset = continued ? 0 : ep.startDateTime.diff(weekStart, 'days')

        const spanContinued =  continued ? this.$moment(ep.endDateTime).diff(weekStart, 'days') + 1 : this.$moment(ep.endDateTime).diff(ep.startDateTime, 'days') + 1
        const span = Math.min(7 - startOffset, spanContinued)

        if (continued) ep.classes.push('continued')
        if (ep.endDateTime.diff(weekStart, 'days') > 6) ep.classes.push('toBeContinued')
        if (ep.endDateTime.isBefore(this.$moment())) ep.classes.push('past')
        if (ep.endDateTime.isBetween(this.$moment(ep.startDateTime), this.$moment(ep.startDateTime).hours(23).minutes(59).seconds(59), undefined, '[]')) ep.classes.push('oneDay')

        for (let d = 0; d < 7; d++) {
          if (d === startOffset) {
            let s = 0
            while (eventRows[d][s]) s++
            ep.eventRow = s
            eventRows[d][s] = true
          } else if (d < startOffset + span) {
            eventRows[d][ep.eventRow] = true
          }
        }
        ep.classes.push(`offset${startOffset}`)
        ep.classes.push(`span${span}`)
        results.push(ep)
      }
      console.log(results)
      return results
    },
    getEventTop (e) {
      // Compute the top position of the event based on its assigned row within the given week.
      const r = e.eventRow
      const h = '20px'
      const b = '2px'
      return `calc( 35px + ${r}*${h} + ${r}*${b})`
    }
  }
}
</script>
<style lang="sass">
  @import "assets/style"
</style>
