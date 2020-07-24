<template>
    <div>
        <div id="app">
            <persian-calendar></persian-calendar>
        </div>
    </div>
</template>

<script>
import PersianCalendar from './PersianCalendar.vue'

export default {
  components:{
    PersianCalendar
  }
}
</script>

<style lang="scss">
#app {
  padding: 30px;
}
</style>