## Vue Persian Calendar

###Installation
install with yarn:
```
yarn add vue-persian-calendar
```
or npm:
```
npm i -S add vue-persian-calendar
```
then use component in vue to access it from all components:
 ```js
// import Vue from 'vue'
// ...
import PersianCalendar from 'vue-persian-calendar';
Vue.use(PersianCalendar)
// ...
```

or just import in component:
```js
import PersianCalendar from 'vue-persian-calendar';

export default {
  // ...
  components: {
    PersianCalendar
  }
  // ...
}
```
###Usage
```vue
<persian-calendar></persian-calendar>
```