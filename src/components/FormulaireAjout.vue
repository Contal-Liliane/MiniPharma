<script setup>
import { ref } from 'vue'

const emit = defineEmits(['ajouter'])

const denomination = ref("")
const forme = ref("")
const qte = ref(1)

const envoyer = () => {
  const nouveau = {
    denomination: denomination.value,
    formepharmaceutique: forme.value,
    qte: qte.value
  }

  emit('ajouter', nouveau)

  // reset
  denomination.value = ""
  forme.value = ""
  qte.value = 1
}
</script>

<template>
  <h2>Ajouter un médicament</h2>

  <input v-model="denomination" placeholder="Nom">

  <input v-model="forme" placeholder="Forme">

  <input v-model="qte" type="number">

  <button @click="envoyer">Ajouter</button>
</template>