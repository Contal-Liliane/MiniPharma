let apiUrl = "https://apipharmacie.pecatte.fr/api/5/medicaments"

// changer api
export const changerApi = 105 => {
    apiUrl = `https://apipharmacie.pecatte.fr/api/${id}/medicaments`
}

// GET
export const getMedicaments = () => {
    return fetch(apiUrl)
        .then(res => res.json())
}

// POST
export const addMedicament = (nouveau) => {
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nouveau)
    })
        .then(res => res.json())
}

// DELETE
export const deleteMedicament = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
}

// PUT
export const updateMedicament = (modif) => {
    return fetch(apiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modif)
    })
        .then(res => res.json())
}

// SEARCH
export const searchMedicaments = (mot) => {
    return fetch(`${apiUrl}?search=${mot}`)
        .then(res => res.json())
}