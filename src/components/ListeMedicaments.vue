<script setup>
import ModifierMedicaments from './ModifierMedicaments.vue'
import { ref } from 'vue'

defineProps(['medicaments'])
const emit = defineEmits(['supprimer', 'plus', 'moins', 'modifier'])

const medSelectionne = ref(null)
</script>

<template>

  <div class="grid">

    <div class="card" v-for="med in medicaments" :key="med.id">

      <div class="top">
        <h3>💊 {{ med.denomination }}</h3>

        <div>
          <button @click="medSelectionne = med">✏️</button>
          <button @click="$emit('supprimer', med.id)">🗑️</button>
        </div>
      </div>

      <div v-if="medSelectionne?.id !== med.id">

        <p>{{ med.formepharmaceutique }}</p>

        <div class="quantite">
          <button @click="$emit('moins', med)">-</button>
          {{ med.qte }}
          <button @click="$emit('plus', med)">+</button>
        </div>

        <img
          v-if="med.photo"
          :src="'https://apipharmacie.pecatte.fr/images/' + med.photo"
        />

      </div>

      <ModifierMedicaments
        v-else
        :medicament="med"
        @modifier="(modif) => {
          emit('modifier', modif)
          medSelectionne = null
        }"
      />

    </div>

  </div>

</template>

<style>

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card {
  background: white;
  border-radius: 15px;
  padding: 20px;
}

.quantite {
  margin-top: 10px;
  background: #e0e7ff;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
}

img {
  width: 100%;
  max-height: 120px;
  object-fit: contain;
  margin-top: 10px;
}

</style>
