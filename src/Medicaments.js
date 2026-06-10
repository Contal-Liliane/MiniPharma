let apiUrl = "https://apipharmacie.pecatte.fr/api/5/medicaments"

const apiNormale = "https://apipharmacie.pecatte.fr/api/5/medicaments"
const apiMagique = "https://apipharmacie.pecatte.fr/api/105/medicaments"

// changer API affichée
export const changerApi = (id) => {

    apiUrl = `https://apipharmacie.pecatte.fr/api/${id}/medicaments`
}

// GET
export const getMedicaments = () => {

    return fetch(apiUrl)
        .then(res => res.json())
}

// SEARCH
export const searchMedicaments = (mot) => {

    return fetch(`${apiUrl}?search=${mot}`)
        .then(res => res.json())
}

// AJOUT SYNCHRO
export const addMedicament = async (nouveau) => {

    // médicament normal
    const normal = {

        denomination: nouveau.denomination,

        formepharmaceutique: nouveau.formepharmaceutique,

        qte: nouveau.qte,

        photo: nouveau.photo
    }

    // médicament magique
    const magique = {

        denomination: nouveau.denominationMagique,

        formepharmaceutique: nouveau.formepharmaceutique,

        qte: nouveau.qte,

        photo: nouveau.photo
    }

    // ajout API normale
    await fetch(apiNormale, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(normal)
    })

    // ajout API magique
    await fetch(apiMagique, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(magique)
    })

    return Promise.resolve()
}

// DELETE SYNCHRO
export const deleteMedicament = async (id) => {

    // suppression API actuelle
    await fetch(`${apiUrl}/${id}`, {

        method: "DELETE"
    })

    // liste magique
    const liste105 = await fetch(apiMagique)
        .then(res => res.json())

    // même position
    const correspondant = liste105[id - 1]

    // suppression API magique
    if (correspondant) {

        await fetch(`${apiMagique}/${correspondant.id}`, {

            method: "DELETE"
        })
    }

    return Promise.resolve()
}

// UPDATE SYNCHRO
export const updateMedicament = async (modif) => {

    // modifier API actuelle
    await fetch(apiUrl, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            id: modif.id,

            denomination: modif.denomination,

            formepharmaceutique: modif.formepharmaceutique,

            qte: modif.qte,

            photo: modif.photo
        })
    })

    // récupérer API magique
    const liste105 = await fetch(apiMagique)
        .then(res => res.json())

    // même position
    const correspondant = liste105[modif.id - 1]

    // modifier API magique
    if (correspondant) {

        const magique = {

            id: correspondant.id,

            denomination: modif.denominationMagique,

            formepharmaceutique: modif.formepharmaceutique,

            qte: modif.qte,

            photo: modif.photo
        }

        await fetch(apiMagique, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(magique)
        })
    }

    return Promise.resolve()
}