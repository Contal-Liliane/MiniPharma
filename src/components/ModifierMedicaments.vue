<script setup>
import { ref } from 'vue'

// on récupère le médicament à modifier
const props = defineProps(['medicament'])

// pour envoyer au parent
const emit = defineEmits(['modifier'])

// champs du formulaire
const denomination = ref(props.medicament.denomination)
const forme = ref(props.medicament.formepharmaceutique)
const qte = ref(props.medicament.qte)

// fonction envoyer
const valider = () => {
  const modif = {
    id: props.medicament.id,
    denomination: denomination.value,
    formepharmaceutique: forme.value,
    qte: Number(qte.value)
  }

  emit('modifier', modif)
}
</script>

<template>
  <div>
    <h3>Modifier médicament</h3>

    <input v-model="denomination" placeholder="Nom">

    <input v-model="forme" placeholder="Forme">

    <input v-model="qte" type="Nombre">

    <button @click="valider">Valider</button>
  </div>
</template>