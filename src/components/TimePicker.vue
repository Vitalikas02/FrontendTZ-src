<template>
    <div>
      <Calendar v-model="time" timeOnly showIcon />
      <div class="btns-container">
        <Button label="Сегодня" @click="setToday" />
        <Button label="Очистить" @click="clearTime" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Calendar from 'primevue/calendar';
  import Button from 'primevue/button';
  
  export default defineComponent({
    name: 'TimePicker',
    components: { Calendar, Button },
    setup() {
      const time = ref<Date | null>(null);
  
      const setToday = () => {
        time.value = new Date();
      };
  
      const setNow = () => {
        time.value = new Date();
      };
  
      const clearTime = () => {
        time.value = null;
      };
  
      return { time, setToday, setNow, clearTime };
    }
  });
  </script>
  
  <style>
  .btns-container {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
  </style>