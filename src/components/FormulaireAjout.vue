<script setup>
import { ref } from 'vue'

const emit = defineEmits(['ajouter'])

const denomination = ref("")
const forme = ref("")
const qte = ref(1)
const photo = ref("")

// image → base64
const handleFileUpload = (event) => {

  const file = event.target.files[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    photo.value = reader.result
  }

  reader.readAsDataURL(file)
}

const envoyer = () => {

  const nouveau = {
    denomination: denomination.value,
    formepharmaceutique: forme.value,
    qte: qte.value,
    photo: photo.value
  }

  emit('ajouter', nouveau)

  denomination.value = ""
  forme.value = ""
  qte.value = 1
  photo.value = ""
}
</script>

<template>

  <h2>Ajouter un médicament</h2>

  <input v-model="denomination" placeholder="Nom">

  <input v-model="forme" placeholder="Forme">

  <input v-model="qte" type="number">

  <input type="file" @change="handleFileUpload">

  <button @click="envoyer">
    Ajouter
  </button>

</template>