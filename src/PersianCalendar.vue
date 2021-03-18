<template>
    <div id="persian-calendar">
      <!--CALENDAR HEADER-->
      <div id="vpc_header" slot="header">
        <div id="vpc_date-control">
          <div class="vpc_control-btn" @click="subtractPeriod" :disabled="isBeforeMin()">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>

          <span v-if="isWeekPeriod" class="vpc_now-date">
              {{displayRangeText.toPersianDigits()}}
          </span>
          <span v-else class="vpc_now-date">{{currentDate.locale('fa').format('jMMMM jYYYY').toPersianDigits()}}</span>

          <div class="vpc_control-btn" @click="addPeriod" :disabled="isAfterMax()">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </div>
          <div v-if="!disableToday" class="vpc_today-btn" @click="goToday" :disabled="todayBtnDisable">امروز</div>
        </div>
          <div v-if="!disablePeriod" class="vpc_period-control">
              <div class="vpc_period-btn" @click="togglePeriod">{{displayPeriodText}}</div>
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
                v-for="week in periodWeeks"
                :key="week.uid"
                :class="weekClassObject"
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
                                :style="`top:${getEventTop(i)};background-color:${i.color};`"
                                class="vpc_event"
                                @click="$emit('on-event-click', i)"
                        >
                            <div :style="{'background-color':i.color}" class="vpc_event-ball"></div>
                            <span class="vpc_event-start-time" v-if="!hideEventTimes">{{ i.startDateTime.format('HH:mm').toPersianDigits() }}<span> - {{ i.endDateTime.format('HH:mm').toPersianDigits() }} </span>
                            </span>
                            <span class="vpc_event-start-date" v-if="!hideEventTimes">{{ i.startDateTime.format('jMM/jDD').toPersianDigits() }}</span>
                            <span class="vpc_event-title">{{ i.title }}</span>
                            <span class="vpc_event-end-time" v-if="!hideEventTimes">{{ i.endDateTime.format('HH:mm').toPersianDigits() }}</span>
                            <span class="vpc_event-end-date" v-if="!hideEventTimes">{{ i.endDateTime.format('jMM/jDD').toPersianDigits() }}</span>
                        </div>
                    </slot>
                </template>
              <!--DAYS-->
              <div
                  v-for="day in week"
                  :key="day.uid"
                  :class="dayClassObject(day)"
                  @click="emitDay(day, $event)"
              >
                <div class="vpc_day-number">{{ day.format('jD').toPersianDigits() }}</div>
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
  props: {
    dateFormat:{
      type: String,
      default () {
        return 'jYYYY/jMM/jDD'
      }
    },
    showDate: {
      type: [Object, String],
      default () {
        return this.$moment()
      }
    },
    displayPeriod: String,
    eventsList: {
      type: Array,
      default () {
        return []
      }
    },
    minDate: [Object, String],
    maxDate: [Object, String],
    hideEventTimes: {
      type: Boolean,
      default () {
        return false
      }
    },
    disableToday: {
      type: Boolean,
      default () {
        return false
      }
    },
    disablePeriod: {
      type: Boolean,
      default () {
        return false
      }
    },
    hideMonthShadow: {
      type: Boolean,
      default () {
        return false
      }
    },
    hidePastDaysShadow: {
      type: Boolean,
      default () {
        return false
      }
    },
    disablePastDays: {
      type: Boolean,
      default () {
        return false;
      }
    }
  },
  data () {
    return {
      currentDate: null,
      currentDateChange: true,
      transitionAction: 'slide-right',
      addEventModalShow: false,
      period: 'month',
      events: [],
      min: null,
      max: null
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
    daysInMonth () {
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
      const JOMEE = 6
      if (currentDay.jDay() !== SHANBE) {
        do {
          currentDay = this.$moment(currentDay).subtract(1, 'days')
          days.unshift(currentDay)
        } while (currentDay.jDay() !== SHANBE)
      }
      // Add following days to end
      currentDay = this.$moment(days[days.length - 1])
      if (currentDay.jDay() !== JOMEE) {
        do {
          currentDay = this.$moment(currentDay).add(1, 'days')
          days.push(currentDay)
        } while (currentDay.jDay() !== JOMEE)
      }
      return days
    },
    daysInWeek () {
      const days = []
      const showDay = this.currentDate.locale('fa')
      let day = showDay.startOf('jWeek')
      do {
        days.push(day)
        day = this.$moment(day).add(1, 'days')
      } while (!day.isSame(this.$moment(showDay).add(7, 'days')))
      return days
    },
    weeksInMonth () {
      const weeks = []
      let week = []
      for (let i = 0; i < this.daysInMonth.length; i++) {
        week.push(this.daysInMonth[i])
        if (week.length === 7) {
          weeks.push(week)
          week = []
        }
      }
      return weeks
    },
    isWeekPeriod () {
      return this.period === 'week'
    },
    periodWeeks () {
      return this.isWeekPeriod ? [this.daysInWeek] : this.weeksInMonth
    },
    displayPeriodText () {
      return this.isWeekPeriod ? 'ماه' : 'هفته'
    },
    displayRangeText () {
      const start = this.$moment(this.currentDate).locale('fa').startOf('jWeek')
      const end = this.$moment(start).locale('fa').add(6, 'days')
      let startformat = 'DD'

      if (!start.isSame(end, 'month')) startformat = 'DD jMMMM'
      if (!start.isSame(end, 'year')) startformat = 'DD jMMMM jYYYY'

      return `${start.format(startformat)} - ${end.format('DD jMMMM jYYYY')}`
    },
    todayBtnDisable () {
      if (this.min) {
        if (this.max) return !this.$moment().isBetween(this.$moment(this.min).startOf('day'), this.$moment(this.max).endOf('day'))

        return this.min.isAfter(this.$moment().startOf('day'), 'day')
      }
      if (this.max) {
        return this.max.isBefore(this.$moment().endOf('day'), 'day')
      }
      return false
    },
    weekClassObject () {
      return {
        'vpc_week': true,
        'vpc_week-period': this.isWeekPeriod
      }
    }
  },
  watch: {
    currentDate () {
      // update transition
      this.currentDateChange = false
    },
    showDate (value) {
      this.currentDate = this.getDateByFormat(value)
    },
    displayPeriod (value) {
      this.period = value
    },
    eventsList (value) {
      this.events = value
    },
    minDate (value) {
      this.min = this.getDateByFormat(value)
    },
    maxDate (value) {
      this.max = this.getDateByFormat(value)
    }
  },
  created () {
    // this.$moment.locale('fa')
    this.currentDate = this.getDateByFormat(this.showDate)
    if (this.minDate) this.min = this.getDateByFormat(this.minDate)
    if (this.maxDate) this.max = this.getDateByFormat(this.maxDate)
    this.period = this.displayPeriod
    this.events = this.eventsList
  },
  methods:{
    getDateByFormat (value) {
      try {
        if (typeof value === 'string') return this.$moment(value, this.dateFormat)
        else if (typeof value === 'object') return this.$moment(value)
      } catch (error) {
        throw new TypeError('[VuePersianCalendar Error]: showDate property value is not valid')
      }
    },
    isAfterMax () {
      if (!this.max) return
      const newDate = this.$moment(this.currentDate).add(1, this.isWeekPeriod ? 'weeks' : 'months')
      const periodStart = newDate.startOf(this.isWeekPeriod ? 'jWeek' : 'jMonth')
      return this.max.isValid() && periodStart.isAfter(this.max)
    },
    isBeforeMin () {
      if (!this.min) return
      const newDate = this.$moment(this.currentDate).subtract(1, this.isWeekPeriod ? 'weeks' : 'months')
      const periodEnd = this.$moment(this.min).startOf(this.isWeekPeriod ? 'jWeek' : 'jMonth')
      return this.min.isValid() && periodEnd.isAfter(newDate)
    },
    addPeriod () {
      if (this.isAfterMax()) return
      this.transitionAction = 'slide-left'
      this.currentDate = this.$moment(this.currentDate).add(1, this.isWeekPeriod ? 'weeks' : 'months')
      this.$emit('on-page-add', this.currentDate)
    },
    subtractPeriod () {
      if (this.isBeforeMin()) return
      this.transitionAction = 'slide-right'
      this.currentDate = this.$moment(this.currentDate).subtract(1, this.isWeekPeriod ? 'weeks' : 'months')
      this.$emit('on-page-subtract', this.currentDate)
    },
    goToday () {
      if (this.todayBtnDisable) return
      if (this.currentDate.isBefore(this.$moment(), 'month') || (this.isWeekPeriod && this.currentDate.isBefore(this.$moment().startOf('jWeek')))) {
        this.transitionAction = 'slide-left'
        this.currentDate = this.$moment()
      } else if (this.currentDate.isAfter(this.$moment(), 'month') || (this.isWeekPeriod && this.currentDate.isAfter(this.$moment(), 'week'))) {
        this.transitionAction = 'slide-right'
        this.currentDate = this.$moment()
      }
    },
    togglePeriod () {
      this.period = this.isWeekPeriod ? 'month' : 'week'
      this.$emit('update:displayPeriod', this.period)
      this.$emit('on-display-period-change', this.period)

      // update transition
      this.currentDateChange = false
    },
    dayClassObject (day) {
      const today = day.isSame(this.$moment(), 'day')

      let disable = false
      if (this.min) {
        disable = (this.min.isValid() && day.isBefore(this.min, 'day')) || disable
      }
      if (this.max) {
        disable = (this.max.isValid() && day.isAfter(this.max, 'day')) || disable
      }

      return {
        'vpc_day': true,
        'vpc_today': today && !this.disableToday,
        'vpc_past': day.isSameOrBefore(this.$moment(), 'day') && !today && !this.hidePastDaysShadow,
        'vpc_not-current-month': !day.isSame(this.currentDate, 'month') && !this.isWeekPeriod && !this.hideMonthShadow,
        'vpc_week-period-day': this.isWeekPeriod,
        'vpc_day-disable': disable
      }
    },
    afterLeave () {
      // Transition show month after fade out
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
          classes: events[i].classes ? [...events[i].classes] : [],
          eventRow: 0
        })
        const continued = ep.startDateTime.isBefore(weekStart)
        const startOffset = continued ? 0 : this.diff(ep.startDateTime, weekStart)

        const spanContinued =  continued ? this.diff(this.$moment(ep.endDateTime), weekStart) + 1 : this.diff(this.$moment(ep.endDateTime), ep.startDateTime) + 1
        const span = Math.min(7 - startOffset, spanContinued)

        if (continued) ep.classes.push('continued')
        if (this.diff(ep.endDateTime, weekStart) > 6) ep.classes.push('toBeContinued')
        if (ep.endDateTime.isBefore(this.$moment())) ep.classes.push('past')
        if (ep.endDateTime.isBetween(this.$moment(ep.startDateTime), this.$moment(ep.startDateTime).endOf('day'), undefined, '[]')) ep.classes.push('oneDay')

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
      return results
    },
    getEventTop (e) {
      // Compute the top position of the event based on its assigned row within the given week.
      const r = e.eventRow
      const h = this.isWeekPeriod ? '2.6em' : '1.3em'
      const b = '2px'
      return `calc( 2.5em + ${r}*${h} + ${r}*${b})`
    },
    diff (e, s) {
      s.locale('fa')
      e.locale('fa')
      const add_diff = s.clone().startOf('day').add(e.diff(s, 'm'), 'm').locale('fa'),
        diff = e.diff(s, 'day')
      
      if (add_diff.isBefore(e, 'day')) return diff + 1
      return diff
      //const diff = e.diff(s, 'day')
      //if (parseInt(e.format('jD')) > parseInt(s.format('jD'))) return parseInt(e.format('jD')) - parseInt(s.format('jD'))
    },
    emitDay(day, $event) {
      if (this.disablePastDays) {
        if (!day.isBefore(this.$moment(), 'day')) {
          this.$emit('on-day-click', day);
        } else {
          $event.stopPropagation();
        }
      }
    }
  }
}
</script>
<style lang="sass">
    @import "assets/style"
</style>
