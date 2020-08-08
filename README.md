
# Vue Persian Calendar

## Preview images

![alt text](https://github.com/aminmokhtari94/vue-persian-calendar/blob/master/preview_images/month.png?raw=true)

![alt text](https://github.com/aminmokhtari94/vue-persian-calendar/blob/master/preview_images/week.png?raw=true)

## Installation

install with yarn:

```text
yarn add vue-persian-calendar vue-jalali-moment
```

or npm:

```text
npm i -S add vue-persian-calendar vue-jalali-moment
```

then use component in vue to access it from all components:

 ```js
// import Vue from 'vue'
// ...

import moment from 'vue-jalali-moment'
Vue.use(moment)

import PersianCalendar from 'vue-persian-calendar';
Vue.use(PersianCalendar)

// ...
```

### recommend reading

- [vue jalali moment](https://www.npmjs.com/package/vue-jalali-moment)
- [jalali moment](https://www.npmjs.com/package/jalali-moment)
- [moment js](https://momentjs.com/docs/#/displaying/calendar-time/)

## Usage

```vue
<persian-calendar></persian-calendar>
```

## Available props

|Prop                   | Type     | Default   | Description                                            |
|-----------------------|----------|-----------|--------------------------------------------------------|
| show-date             | [Jalali Moment Object](https://github.com/fingerpich/jalali-moment)   | $moment() | Init Date of the calendar                              |
| display-period        | String   | 'month'   | 'month' or 'week' period                               |
| events-list           | Array of [EventObject](#event-item-properties)   | []        | List of Events                                         |
| min                   | [Jalali Moment Object](https://github.com/fingerpich/jalali-moment)   | null      | Limit minimum time to navigate to                      |
| max                   | [Jalali Moment Object](https://github.com/fingerpich/jalali-moment)   | null      | Limit minimum time to navigate to                      |
| disable-today         | Boolean  | false     | If set, Today button and today mark won't show         |
| disable-period        | Boolean  | false     | If set, Period change button won't show                |
| hide-event-times      | Boolean  | false     | If set, Event date and time won't show                 |
| hide-month-shadow     | Boolean  | false     | If set, Shadow of days not in showing month won't show |
| hide-past-days-shadow | Boolean  | false     | If set, Shadow of past days won't show                 |

## Events

These events emitted on actions in the persian calendar:

| Event             | Output     | Description                          |
|-------------------|------------|--------------------------------------|
| on-day-click     | [Jalali Moment Object](https://github.com/fingerpich/jalali-moment) | A Day has been selected |
| on-event-click     | [EventObject](#event-item-properties) | An Event has been selected |
| on-display-period-change     | 'week' \| 'month' | Display Period has been changed  |
| on-page-add     |      | Display Page has been added |
| on-page-subtract     |      | Display Page has been subtracted |

## Event Item Properties

| name      | Type     | Description                                            |
|------------|----------|--------------------------------------------------------|
| id  | String\|Number   | A unique identifier for the event. This is required and must be unique. |
| startDateTime  | [Jalali Moment Object](https://github.com/fingerpich/jalali-moment)  | The moment the event starts on the calendar. |
| endDateTime  | [Jalali Moment Object](https://github.com/fingerpich/jalali-moment)  | The moment the event ends on the calendar. |
| title  | String   | The name of the event shown on the calendar. |
| classes  | String  | Any additional CSS classes you wish to assign to the event. |
| color  | String  | CSS Color for event background |

## Slots

### header

This **optional** named slot replaces the calendar's header. Generally, this would show the current date range, and allow the user to navigate back and forth through time. If you don't provide a component for this slot, there comes with a nice default header component, which you can either use directly, or use as a template for creating your own.

### event

This **optional** named slot replaces the div.item for each item (not just the contents of the items element, the entire element). Use this if you want to override entirely how items are rendered. For example, on a small mobile device, you may want to show just a thin stripe, dots, or icons to indicate items, without titles or times. This slot passes three scoped variables:

- `value`: the normalized calendar item
- `weekStartDate`: the date of the first day of the week being rendered
- `top`: the CSS top value that you should apply to the style of your item element so it appears in the proper place. Assumes standard metrics for items, so if you have your own metrics, you'll need to compute and apply the top position yourself using the itemow value passed in the item.

example of using `event` slot:  

```vue
<template>
    <div>
        <div id="app">
            <persian-calendar
                    :events-list="events"
                    :show-date="$moment('1399/05/26', 'jYYYY/jMM/jDD')"
                    :display-period.sync="period"
            >
                <template slot="event" slot-scope="i">
                   <div
                        :key="i.value.id"
                        :class="i.value.classes"
                        :style="`top:${i.top};background-color:${i.value.color};`"
                        class="vpc_event" 
                        style="border:2px dashed #eee"
                >
                    <!--  Anything You Wish -->
                    <span class="vpc_event-title" style="text-decoration: underline">{{ i.value.title }}</span>
                </div>
                </template>
            </persian-calendar>
            <h2>Current Display Period {{period}}</h2>
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
      period:'week',
      events:[
        {id:1, startDateTime:this.$moment('1399/05/07 19:30', 'jYYYY/jMM/jDD HH:mm'), endDateTime:this.$moment('1399/05/09 07:15', 'jYYYY/jMM/jDD HH:mm'), title:'رویداد شماره ۱', color:'#2a79b8', classes: []},
        {id:2, startDateTime:this.$moment('1399/05/13 10:30', 'jYYYY/jMM/jDD HH:mm'), endDateTime:this.$moment('1399/05/13 15:00', 'jYYYY/jMM/jDD HH:mm'), title:'رویداد شماره ۲', color:'#a71749', classes: []},
        {id:7, startDateTime:this.$moment('1399/05/13 10:30', 'jYYYY/jMM/jDD HH:mm'), endDateTime:this.$moment('1399/05/13 11:30', 'jYYYY/jMM/jDD HH:mm'), title:'گفتگوی اسکایپی با مدیر شرکت آرمان', color:'#a71749', classes: []},
        {id:4, startDateTime:this.$moment('1399/05/09 10:30', 'jYYYY/jMM/jDD HH:mm'), endDateTime:this.$moment('1399/05/13 14:00', 'jYYYY/jMM/jDD HH:mm'), title:'رویداد شماره ۳', color:'#34147e', classes: []},
        {id:5, startDateTime:this.$moment('1399/05/06 10:30', 'jYYYY/jMM/jDD HH:mm'), endDateTime:this.$moment('1399/05/08 18:35', 'jYYYY/jMM/jDD HH:mm'), title:'رویداد شماره ۴', color:'#34147e', classes: []},
        {id:3, startDateTime:this.$moment('1399/05/10', 'jYYYY/jMM/jDD'), endDateTime:this.$moment('1399/05/25', 'jYYYY/jMM/jDD'), title:'گفتگوی اسکایپی با مدیر شرکت آرمان', color:'#cb09cb', classes: []}
      ]
    }
  }
}
</script>
```
