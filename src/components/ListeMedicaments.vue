<script setup>
defineProps(['medicaments'])

defineEmits([
  'supprimer',
  'plus',
  'moins',
  'modifier'
])
</script>

<template>

  <div
      v-for="med in medicaments"
      :key="med.id"
      class="card"
  >

    <h3>{{ med.denomination }}</h3>

    <p>{{ med.formepharmaceutique }}</p>

    <p>Quantité : {{ med.qte }}</p>

    <img
        v-if="med.photo"
        :src="'https://apipharmacie.pecatte.fr/images/' + med.photo"
        width="100"
    />

    <br><br>

    <button @click="$emit('plus', med)">
      +1
    </button>

    <button @click="$emit('moins', med)">
      -1
    </button>

    <button @click="$emit('supprimer', med.id)">
      Supprimer
    </button>

    <button @click="$emit('modifier', med)">
      Modifier
    </button>

  </div>

</template>

<style>
.card {
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
}
</style>