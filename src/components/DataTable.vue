<template>
    <DataTable :value="formattedData">
      <Column field="timestamp" header="Timestamp"></Column>
      <Column field="action" header="Action"></Column>
    </DataTable>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  
  export default defineComponent({
    components: { DataTable, Column },
    setup() {
      const rawData = '[13:36:53] Расчетное время: 9 мин[13:36:58] Открыть клапан откачки К1[13:36:58] Включить вакуумный насос[13:36:58] Закрыть клапан К5[13:36:58] Закрыть клапан дистилляции К2[13:36:58] Ожидание: 8 с[13:37:06] Заливка 2.2мл. в испаритель[13:37:06] Заданно 26.50602409638554 шагов[13:37:09] Заливка перекиси завершена[13:37:09] Открыть клапан дистилляции К2[13:42:09] Включить нагрев испарителя[13:42:09] Закрыть клапан дистилляции К2[13:42:09] конечное давление 1.0960040758227925 торр[13:42:09] Выпаривание через К2[13:42:09] Выпаривание длилось 5 мин[13:42:09] Откачка до 1 торр[13:42:15] Закрыть клапан откачки К1[13:43:09] Открыть клапан откачки К1[13:43:14] Аппаратное смещение 0 денсит. = -0.313683180809021[13:43:14] Закрыть клапан дистилляции К2';
  
      const formattedData = ref(formatData(rawData));
  
      function formatData(data: string) {
        const regex = /\[(\d{2}:\d{2}:\d{2})\] ([^\[]+)/g;
        const result = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          result.push({ timestamp: match[1], action: match[2] });
        }
        return result;
      }
  
      return {
        formattedData
      };
    }
  });
  </script>
  
  <style scoped>
  .p-datatable .p-datatable-tbody > tr > td {
    white-space: pre-wrap;
  }
  </style>