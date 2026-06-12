<script setup>
import { ref } from 'vue'

const props = defineProps(['medicament'])

const emit = defineEmits(['modifier'])

const denomination = ref(props.medicament.denomination)
const denominationMagique = ref("")
const forme = ref(props.medicament.formepharmaceutique)
const qte = ref(props.medicament.qte)
const photo = ref(props.medicament.photo)

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

    denominationMagique: denominationMagique.value,

    formepharmaceutique: forme.value,

    qte: Number(qte.value),

    photo: photo.value
  }

  emit('modifier', modif)
}
</script>

<template>

  <div>

    <h3>Modifier médicament</h3>

    <input
        v-model="denomination"
        placeholder="Nom normal"
    >

    <br><br>

    <input
        v-model="denominationMagique"
        placeholder="Nom magique"
    >

    <br><br>

    <input
        v-model="forme"
        placeholder="Forme"
    >

    <br><br>

    <input
        v-model="qte"
        type="number"
    >

    <br><br>

    <input
        type="file"
        @change="handleFileUpload"
    >

    <br><br>

    <button @click="valider">
      Valider
    </button>

  </div>

</template>