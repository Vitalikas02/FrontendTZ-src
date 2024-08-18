<template>
  <div class="main">
    <InputText v-if="!isEditing" :value="title" @click="editLink" placeholder="https://" />
    <InputText v-else v-model="url" @blur="fetchTitle" @keyup.enter="fetchTitle" placeholder="https://" />
    <i v-if="!isEditing" class="pi pi-pencil" @click="editLink"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputText from 'primevue/inputtext';

export default defineComponent({
  name: 'LinkField',
  components: { InputText },
  setup() {
    const url = ref('');
    const title = ref('');
    const isEditing = ref(true);

    const editLink = () => {
      isEditing.value = !isEditing.value;
    };

    const fetchTitle = async () => {
  if (url.value) {
    try {
      const response = await fetch(`http://localhost:3000/proxy?url=${encodeURIComponent(url.value)}`);
      const data = await response.json();
      title.value = data.title || 'Заголовок не найден';
    } catch (error) {
      console.error('Ошибка при получении заголовка:', error);
      title.value = 'Ошибка при получении заголовка';
    }
    isEditing.value = false;
  }
};

  return { url, title, isEditing, editLink, fetchTitle };
  }
});
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  width: 100%;
}
.pi-pencil {
  cursor: pointer;
  margin-left: 8px;
}
.p-inputtext {
  width: 30%;
}
</style>
  