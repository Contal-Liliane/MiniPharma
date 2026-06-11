<script setup>
import { ref } from 'vue'
const emit = defineEmits(['ajouter'])

const denomination = ref("")
const denominationMagique = ref("")
const forme = ref("")
const qte = ref(1)
const photo = ref("")
const description = ref("")
const effetsSecondaires = ref("")

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => photo.value = reader.result
  reader.readAsDataURL(file)
}

const envoyer = () => {
  emit('ajouter',{
    denomination: denomination.value,
    denominationMagique: denominationMagique.value,
    formepharmaceutique: forme.value,
    qte: qte.value,
    photo: photo.value,
    description: description.value,
    effetsSecondaires: effetsSecondaires.value
  })

  // reset
  denomination.value = ""
  denominationMagique.value = ""
  forme.value = ""
  qte.value = 1
  photo.value = ""
  description.value = ""
  effetsSecondaires.value = ""
}
</script>

<template>

<div>

<input v-model="denomination" placeholder="Nom normal">
<input v-model="denominationMagique" placeholder="Nom magique">
<input v-model="forme" placeholder="Forme">
<input v-model="qte" type="number">

<textarea v-model="description" placeholder="Description / prise"></textarea>
<textarea v-model="effetsSecondaires" placeholder="Effets secondaires"></textarea>

<input type="file" @change="handleFileUpload">

<button @click="envoyer">Ajouter</button>

</div>

</template>