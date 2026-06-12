let apiUrl = "https://apipharmacie.pecatte.fr/api/5/medicaments"

const apiNormale = "https://apipharmacie.pecatte.fr/api/5/medicaments"
const apiMagique = "https://apipharmacie.pecatte.fr/api/105/medicaments"

export const changerApi = (id) => {
    apiUrl = "https://apipharmacie.pecatte.fr/api/" + id + "/medicaments"
}

export const getMedicaments = () => {
    return fetch(apiUrl)
        .then(res => res.json())
}

export const searchMedicaments = (mot) => {
    return fetch(apiUrl + "?search=" + mot)
        .then(res => res.json())
}

export const addMedicament = (nouveau) => {

    const normal = {
        denomination: nouveau.denomination,
        formepharmaceutique: nouveau.formepharmaceutique,
        qte: nouveau.qte,
        photo: nouveau.photo
    }

    const magique = {
        denomination: nouveau.denominationMagique,
        formepharmaceutique: nouveau.formepharmaceutique,
        qte: nouveau.qte,
        photo: nouveau.photo
    }

    return fetch(apiNormale, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normal)
    })
    .then(() => {
        return fetch(apiMagique, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(magique)
        })
    })
}

export const deleteMedicament = (id) => {

    let apiSource = apiUrl
    let apiCible = apiUrl.includes("/105/") ? apiNormale : apiMagique

    let listeSource = []
    let index = -1

    return fetch(apiSource)
        .then(res => res.json())
        .then(data => {

            listeSource = data
            index = listeSource.findIndex(m => m.id === id)

            return fetch(apiSource + "/" + id, {
                method: "DELETE"
            })
        })
        .then(() => fetch(apiCible))
        .then(res => res.json())
        .then(listeCible => {

            const correspondant = listeCible[index]

            if (correspondant) {
                return fetch(apiCible + "/" + correspondant.id, {
                    method: "DELETE"
                })
            }
        })
}

export const updateMedicament = (modif) => {

    let apiSource
    let apiCible

    // déterminer source et cible
    if (apiUrl.includes("/105/")) {
        apiSource = apiMagique
        apiCible = apiNormale
    } else {
        apiSource = apiNormale
        apiCible = apiMagique
    }

    let listeSource = []
    let index = -1

    return fetch(apiSource)
        .then(res => res.json())
        .then(data => {

            listeSource = data

            // trouver index exact
            index = listeSource.findIndex(m => m.id === modif.id)

            // update dans API source
            const dataSource = {
                id: modif.id,
                denomination: modif.denomination,
                formepharmaceutique: modif.formepharmaceutique,
                qte: modif.qte
            }

            return fetch(apiSource, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataSource)
            })
        })
        .then(() => fetch(apiCible))
        .then(res => res.json())
        .then(listeCible => {

            const correspondant = listeCible[index]

            if (correspondant) {

                const dataCible = {
                    id: correspondant.id,
                    denomination: modif.denominationMagique || modif.denomination,
                    formepharmaceutique: modif.formepharmaceutique,
                    qte: modif.qte
                }

                return fetch(apiCible, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dataCible)
                })
            }
        })
}

