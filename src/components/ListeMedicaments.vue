<script setup>
import ModifierMedicaments from './ModifierMedicaments.vue'
import { ref } from 'vue'

defineProps(['medicaments'])
const emit = defineEmits(['supprimer', 'plus', 'moins', 'modifier'])

const medSelectionne = ref(null)
</script>

<template>

  <div class="grid">

    <div
      class="card"
      v-for="med in medicaments"
      :key="med.id"
    >

      <!-- HEADER -->
      <div class="top">
        <h3>💊 {{ med.denomination }}</h3>

        <div class="icons">
          <button @click="medSelectionne = med">✏️</button>
          <button @click="$emit('supprimer', med.id)">🗑️</button>
        </div>
      </div>

      <!-- CONTENU NORMAL -->
      <div v-if="medSelectionne?.id !== med.id">

        <p class="forme">{{ med.formepharmaceutique }}</p>

        <div class="quantite">
          <button @click="$emit('moins', med)">−</button>
          <span>{{ med.qte }}</span>
          <button @click="$emit('plus', med)">+</button>
        </div>

        <!-- ✅ IMAGE (inchangée comme tu veux) -->
        <img
          v-if="med.photo"
          :src="'https://apipharmacie.pecatte.fr/images/' + med.photo"
        />

        <!-- ✅ DESCRIPTION -->
        <p v-if="med.description" class="desc">
          {{ med.description }}
        </p>

        <!-- ✅ EFFETS -->
        <p v-if="med.effetsSecondaires" class="effets">
          ⚠ {{ med.effetsSecondaires }}
        </p>

      </div>

      <!-- ✅ FORMULAIRE MODIF -->
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

  grid-template-columns: repeat(4, minmax(300px, 1fr));

  gap: 20px;
}

.card {
  background: white;
  border-radius: 15px;

  padding: 20px; /* plus grand */

  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* HEADER */
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top h3 {
  font-size: 14px;
  margin: 0;
}

/* BOUTONS */
.icons button {
  border: none;
  background: #eee;
  border-radius: 5px;
  margin-left: 5px;
  cursor: pointer;
}

/* TEXTE */
.forme {
  font-size: 12px;
  color: gray;
}

/* QUANTITÉ */
.quantite {
  margin-top: 8px;
  background: #e0e7ff;
  border-radius: 10px;
  padding: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantite button {
  border: none;
  background: transparent;
  cursor: pointer;
}

/* IMAGE (inchangée) */
img {
  width: 80px;
  margin-top: 10px;
}

/* DESCRIPTION */
.desc {
  font-size: 12px;
  margin-top: 5px;
}

/* EFFETS */
.effets {
  font-size: 12px;
  color: red;
}

</style>