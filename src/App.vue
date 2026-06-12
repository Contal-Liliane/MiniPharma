<script setup>
import { ref, onMounted } from 'vue'

import ListeMedicaments from './components/ListeMedicaments.vue'
import FormulaireAjout from './components/FormulaireAjout.vue'

import {
  getMedicaments,
  addMedicament,
  deleteMedicament,
  updateMedicament,
  searchMedicaments,
  changerApi
} from './Medicaments.js'

const medicaments = ref([])
const modeMagique = ref(false)

const chargerMedicaments = () => {

  getMedicaments().then(data => {

    let images = JSON.parse(localStorage.getItem("imagesMed") || "{}")

    data.forEach(m => {
      if (images[m.id]) {
        m.photo = images[m.id]
      }
    })

    medicaments.value = data
  })
}

const sauvegarderImage = (med) => {

  let images = JSON.parse(localStorage.getItem("imagesMed") || "{}")

  if (med.photo && med.photo.startsWith("data")) {
    images[med.id] = med.photo
  }

  localStorage.setItem("imagesMed", JSON.stringify(images))
}

const ajouterMedicament = (nouveau) => {
  addMedicament(nouveau).then(() => {
    chargerMedicaments()
  })
}

const supprimerMedicament = (id) => {
  deleteMedicament(id).then(() => {
    chargerMedicaments()
  })
}

const modifierMedicament = (modif) => {

  sauvegarderImage(modif)

  updateMedicament(modif).then(() => {
    chargerMedicaments()
  })
}

const modifierQuantite = (med, delta) => {

  const modif = {
    id: med.id,
    denomination: med.denomination,
    denominationMagique: med.denomination,
    formepharmaceutique: med.formepharmaceutique,
    qte: med.qte + delta,
    photo: med.photo
  }

  sauvegarderImage(modif)

  updateMedicament(modif).then(() => {
    chargerMedicaments()
  })
}

const rechercher = (mot) => {
  if (mot === "") {
    chargerMedicaments()
  } else {
    searchMedicaments(mot).then(data => {
      medicaments.value = data
    })
  }
}

const changerMode = () => {

  modeMagique.value = !modeMagique.value

  if (modeMagique.value) {
    changerApi(105)
  } else {
    changerApi(5)
  }

  chargerMedicaments()
}

onMounted(() => {
  chargerMedicaments()
})
</script>

<template>

<div class="container">

  <div class="header">
    <h1>MiniPharma</h1>

    <button class="magique" @click="changerMode">
      {{ modeMagique ? '🧙 Mode normal' : '✨ Mode magique' }}
    </button>
  </div>

  <input
    type="text"
    placeholder="Rechercher..."
    @input="rechercher($event.target.value)"
  >

  <FormulaireAjout @ajouter="ajouterMedicament" />

  <ListeMedicaments
    :medicaments="medicaments"
    @plus="(med) => modifierQuantite(med, 1)"
    @moins="(med) => modifierQuantite(med, -1)"
    @supprimer="supprimerMedicament"
    @modifier="modifierMedicament"
  />

</div>

</template>

<style>

body {
  margin: 0;
  font-family: Arial;
  background: #ececf3;
}

.container {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  color: #4f46e5;
}

.magique {
  background: linear-gradient(90deg, purple, pink);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
}

input {
  width: 100%;
  padding: 12px;
  margin: 15px 0;
  border-radius: 10px;
  border: 1px solid #ddd;
}

</style>