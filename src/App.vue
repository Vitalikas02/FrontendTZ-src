<template>
  <div class="wrapper">
    <h3>Задача №1</h3>
    <LinkField />
    <hr>
    <h3>Задача №2</h3>
    <TimePicker />
    <hr>
    <h3>Задача №3</h3>
    <MultiSelectWithReset />
    <hr>
    <h3>Задача №4</h3>
    <DataTable />
    <hr>
    <h3>Задача №5</h3>
    <TableWithSearch />
  </div>
</template>

<script setup lang="ts">
import LinkField from './components/LinkField.vue';
import TimePicker from './components/TimePicker.vue';
import MultiSelectWithReset from './components/MultiSelectWithReset.vue';
import DataTable from './components/DataTable.vue';
import TableWithSearch from './components/TableWithSearch.vue';

</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  margin-top: 1em;
}
hr {
  width: 75%;
}
</style>
