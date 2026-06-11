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

// charger données
const chargerMedicaments = () => {
  getMedicaments().then(data => {
    medicaments.value = data
  })
}

// ajouter
const ajouterMedicament = (nouveau) => {
  addMedicament(nouveau).then(() => {
    chargerMedicaments()
  })
}

// supprimer
const supprimerMedicament = (id) => {
  deleteMedicament(id).then(() => {
    chargerMedicaments()
  })
}

// +1 / -1
const modifierQuantite = (med, delta) => {

  updateMedicament({
    id: med.id,
    denomination: med.denomination,
    denominationMagique: med.denomination,
    formepharmaceutique: med.formepharmaceutique,
    qte: med.qte + delta,
    photo: med.photo,
    description: med.description,
    effetsSecondaires: med.effetsSecondaires
  })
  .then(() => chargerMedicaments())
}

// modifier
const modifierMedicament = (modif) => {
  updateMedicament(modif).then(() => {
    chargerMedicaments()
  })
}

// recherche
const rechercher = (mot) => {
  if (mot === "") return chargerMedicaments()

  searchMedicaments(mot).then(data => {
    medicaments.value = data
  })
}

// ✅ ✅ ✅ BOUTON MAGIQUE FIXÉ
const changerMode = () => {

  modeMagique.value = !modeMagique.value

  if (modeMagique.value === true) {
    changerApi(105)
  } else {
    changerApi(5)
  }

  chargerMedicaments()

  console.log("Mode magique :", modeMagique.value) // debug
}

onMounted(() => {
  chargerMedicaments()
})
</script>

<template>

<div class="container">

  <div class="header">
    <h1>MiniPharma</h1>

    <!-- ✅ BOUTON QUI CHANGE TEXTE -->
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

/* plein écran */
.container {
  width: 100%;
  padding: 20px;
}

/* header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  color: #4f46e5;
}

/* bouton */
.magique {
  background: linear-gradient(90deg, purple, pink);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
}

/* barre recherche */
.search {
  width: 100%;
  padding: 12px;
  margin: 15px 0;
  border-radius: 10px;
  border: 1px solid #ddd;
}

</style>
