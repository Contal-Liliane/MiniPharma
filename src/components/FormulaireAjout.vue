<script setup>
import { ref } from 'vue'

const emit = defineEmits(['ajouter'])

const denomination = ref("")
const denominationMagique = ref("")
const forme = ref("")
const qte = ref(1)
const photo = ref("")

// image
const handleFileUpload = (event) => {

  const file = event.target.files[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {

    photo.value = reader.result
  }

  reader.readAsDataURL(file)
}

// ajout
const envoyer = () => {

  const nouveau = {

    denomination: denomination.value,

    denominationMagique: denominationMagique.value,

    formepharmaceutique: forme.value,

    qte: Number(qte.value),

    photo: photo.value
  }

  emit('ajouter', nouveau)

  // reset
  denomination.value = ""
  denominationMagique.value = ""
  forme.value = ""
  qte.value = 1
  photo.value = ""
}
</script>

<template>

  <div class="formulaire">

    <h2>Ajouter un médicament</h2>

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
        placeholder="Forme pharmaceutique"
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

    <button @click="envoyer">
      Ajouter
    </button>

  </div>

</template>

<style>
.formulaire {
  margin-bottom: 20px;
}
</style>