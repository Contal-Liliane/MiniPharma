const apiUrl = "https://apipharmacie.pecatte.fr/api/5/medicaments"

export const getMedicaments = () => {
    return fetch(apiUrl)
        .then(res => res.json())
}

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

export const deleteMedicament = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
}

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
