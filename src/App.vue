<script setup>
import { ref, onMounted } from 'vue'

import ListeMedicaments from './components/ListeMedicaments.vue'
import FormulaireAjout from './components/FormulaireAjout.vue'
import ModifierMedicaments from './components/ModifierMedicaments.vue'

import {
  getMedicaments,
  addMedicament,
  deleteMedicament,
  updateMedicament
} from './Medicaments.js'

const medicaments = ref([])
const modMedicament = ref(null)

const chargerMedicaments = () => {
  getMedicaments()
      .then(data => {
        medicaments.value = data
      })
}

const ajouterMedicament = (nouveau) => {
  addMedicament(nouveau)
      .then(() => {
        chargerMedicaments()
      })
}

const supprimerMedicament = (id) => {
  deleteMedicament(id)
      .then(() => {
        chargerMedicaments()
      })
}

const modifierQuantite = (med, delta) => {
  updateMedicament({
    id: med.id,
    qte: med.qte + delta
  })
      .then(() => {
        chargerMedicaments()
      })
}

const modifierMedicament = (modif) => {
  updateMedicament(modif)
      .then(() => {
        chargerMedicaments()
        modMedicament.value = null
      })
}

onMounted(() => {
  chargerMedicaments()
})
</script>

<template>
  <h1>Ma pharmacie</h1>

  <FormulaireAjout @ajouter="ajouterMedicament" />

  <ul>
    <li v-for="med in medicaments" :key="med.id">

      {{ med.denomination }} -
      {{ med.formepharmaceutique }} -
      Quantité : {{ med.qte }}

      <br>

      <button @click="modifierQuantite(med, 1)">+1</button>
      <button @click="modifierQuantite(med, -1)">-1</button>
      <button @click="supprimerMedicament(med.id)">Supprimer</button>
      <button @click="modMedicament = med">Modifier</button>

      <br><br>

    </li>
  </ul>

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