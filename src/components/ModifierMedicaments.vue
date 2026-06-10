<script setup>
import { ref } from 'vue'

const props = defineProps(['medicament'])

const emit = defineEmits(['modifier'])

const denomination = ref(props.medicament.denomination)
const forme = ref(props.medicament.formepharmaceutique)
const qte = ref(props.medicament.qte)

const photo = ref("")

const handleFileUpload = (event) => {

  const file = event.target.files[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    photo.value = reader.result
  }

  reader.readAsDataURL(file)
}

const valider = () => {

  const modif = {
    id: props.medicament.id,
    denomination: denomination.value,
    formepharmaceutique: forme.value,
    qte: Number(qte.value)
  }

  if (photo.value !== "") {
    modif.photo = photo.value
  }

  emit('modifier', modif)
}
</script>

<template>

  <div>

    <h3>Modifier médicament</h3>

    <input v-model="denomination" placeholder="Nom">

    <input v-model="forme" placeholder="Forme">

    <input v-model="qte" type="number">

    <input type="file" @change="handleFileUpload">

    <button @click="valider">
      Valider
    </button>

  </div>

</template>