let apiUrl = "https://apipharmacie.pecatte.fr/api/5/medicaments"

const apiNormale = "https://apipharmacie.pecatte.fr/api/5/medicaments"
const apiMagique = "https://apipharmacie.pecatte.fr/api/105/medicaments"

// changer API
export const changerApi = (id) => {
    apiUrl = `https://apipharmacie.pecatte.fr/api/${id}/medicaments`
}

// GET
export const getMedicaments = () => {
    return fetch(apiUrl).then(res => res.json())
}

// SEARCH
export const searchMedicaments = (mot) => {
    return fetch(`${apiUrl}?search=${mot}`).then(res => res.json())
}

// ADD
export const addMedicament = async (nouveau) => {

    const normal = {
        denomination: nouveau.denomination,
        formepharmaceutique: nouveau.formepharmaceutique,
        qte: nouveau.qte,
        photo: nouveau.photo,
        description: nouveau.description,
        effetsSecondaires: nouveau.effetsSecondaires
    }

    const magique = {
        denomination: nouveau.denominationMagique,
        formepharmaceutique: nouveau.formepharmaceutique,
        qte: nouveau.qte,
        photo: nouveau.photo,
        description: nouveau.description,
        effetsSecondaires: nouveau.effetsSecondaires
    }

    await fetch(apiNormale, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normal)
    })

    await fetch(apiMagique, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(magique)
    })
}

// DELETE
export const deleteMedicament = async (id) => {

    await fetch(`${apiUrl}/${id}`, { method: "DELETE" })

    const liste105 = await fetch(apiMagique).then(res => res.json())

    const correspondant = liste105[id - 1]

    if (correspondant) {
        await fetch(`${apiMagique}/${correspondant.id}`, {
            method: "DELETE"
        })
    }
}

// UPDATE
export const updateMedicament = async (modif) => {

    await fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: modif.id,
            denomination: modif.denomination,
            formepharmaceutique: modif.formepharmaceutique,
            qte: modif.qte,
            photo: modif.photo,
            description: modif.description,
            effetsSecondaires: modif.effetsSecondaires
        })
    })

    const liste105 = await fetch(apiMagique).then(res => res.json())

    const correspondant = liste105[modif.id - 1]

    if (correspondant) {
        await fetch(apiMagique, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: correspondant.id,
                denomination: modif.denominationMagique,
                formepharmaceutique: modif.formepharmaceutique,
                qte: modif.qte,
                photo: modif.photo,
                description: modif.description,
                effetsSecondaires: modif.effetsSecondaires
            })
        })
    }
}