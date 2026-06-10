<script setup>
import { ref, onMounted } from 'vue'

import ListeMedicaments from './components/ListeMedicaments.vue'
import FormulaireAjout from './components/FormulaireAjout.vue'
import ModifierMedicaments from './components/ModifierMedicaments.vue'

import {
  getMedicaments,
  addMedicament,
  deleteMedicament,
  updateMedicament,
  searchMedicaments,
  changerApi
} from './Medicaments.js'

const medicaments = ref([])
const modMedicament = ref(null)

const modeMagique = ref(false)

// charger médicaments
const chargerMedicaments = () => {

  getMedicaments()
      .then(data => {

        medicaments.value = data
      })
}

// ajouter
const ajouterMedicament = (nouveau) => {

  addMedicament(nouveau)
      .then(() => {

        chargerMedicaments()
      })
}

// supprimer
const supprimerMedicament = (id) => {

  deleteMedicament(id)
      .then(() => {

        chargerMedicaments()
      })
}

// quantité
const modifierQuantite = (med, delta) => {

  updateMedicament({

    id: med.id,

    denomination: med.denomination,

    denominationMagique: med.denomination,

    formepharmaceutique: med.formepharmaceutique,

    qte: med.qte + delta,

    photo: med.photo
  })
      .then(() => {

        chargerMedicaments()
      })
}

// modifier
const modifierMedicament = (modif) => {

  updateMedicament(modif)
      .then(() => {

        chargerMedicaments()

        modMedicament.value = null
      })
}

// recherche
const rechercher = (mot) => {

  if (mot === "") {

    chargerMedicaments()

    return
  }

  searchMedicaments(mot)
      .then(data => {

        medicaments.value = data
      })
}

// changer mode
const changerMode = () => {

  modeMagique.value = !modeMagique.value

  if (modeMagique.value) {

    changerApi(105)
  }

  else {

    changerApi(5)
  }

  chargerMedicaments()
}

onMounted(() => {

  chargerMedicaments()
})
</script>

<template>

  <h1>Ma pharmacie</h1>

  <button @click="changerMode">

    {{ modeMagique ? '🧙 Mode normal' : '🪄 Mode magique' }}

  </button>

  <br><br>

  <input
      type="text"
      placeholder="Rechercher..."
      @input="rechercher($event.target.value)"
  >

  <br><br>

  <FormulaireAjout
      @ajouter="ajouterMedicament"
  />

  <ListeMedicaments
      :medicaments="medicaments"
      @plus="(med) => modifierQuantite(med, 1)"
      @moins="(med) => modifierQuantite(med, -1)"
      @supprimer="supprimerMedicament"
      @modifier="modMedicament = $event"
  />

  <ModifierMedicaments
      v-if="modMedicament"
      :medicament="modMedicament"
      @modifier="modifierMedicament"
  />

</template>

<style>
body {
  font-family: Arial;
}

h1 {
  text-align: center;
}
</style>