<template>
    <div>
        <MultiSelect
        v-model="selectedValues"
        :options="options"
        placeholder="Выберите из списка"
        multiple
        display="chip"
        />
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import MultiSelect from 'primevue/multiselect';
import 'primevue/resources/themes/saga-blue/theme.css';  
import 'primevue/resources/primevue.min.css';            
import 'primeicons/primeicons.css';                

export default defineComponent({
components: { MultiSelect },
setup() {
    const selectedValues = ref<string[]>([]);
    const options = ref<string[]>(['first', 'second', 'third', 'fourth', 'fifth']);

    const resetSelection = () => {
    selectedValues.value = [];
    };

    return {
    selectedValues,
    options,
    resetSelection,
    };
},
});
</script>
  
<style scoped>
</style>
  