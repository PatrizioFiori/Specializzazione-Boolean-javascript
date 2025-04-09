/*
In questo esercizio, utilizzerai async/await per creare la 
funzione getChefBirthday(id). Questa funzione accetta un id 
di una ricetta e deve:
Recuperare la ricetta da 
https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da 
https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef

Nota del docente 
Scrivi la funzione getChefBirthday(id), che deve:
- Essere asincrona (async).
- Utilizzare await per chiamare le API.
- Restituire una Promise con la data di nascita dello chef.
- Gestire gli errori con try/catch
*/

/*
🎯 Bonus 1
Attualmente, se la prima richiesta non trova una ricetta, 
la seconda richiesta potrebbe comunque essere eseguita causando 
errori a cascata.
Modifica getChefBirthday(id) per intercettare eventuali errori 
prima di fare la seconda richiesta.

🎯 Bonus 2
Utilizza la libreria dayjs per formattare la data di 
nascita nel formato giorno/mese/anno.
Esempio di output atteso con formattazione
*/


async function fetchJson(url) {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Errore nella richiesta: ${res.status} - ${res.statusText}`);
    }
    return res.json()
}



async function getChefBirthday(id) {
    try {
        let pizzaRes = await fetchJson(`https://dummyjson.com/recipes/${id}`)
        //pizzaRes = { Nome: "ciao"  } //per testare riga 49
        if (!pizzaRes.userId) {
            throw new Error("userId mancante")
        }
        let userId = pizzaRes.userId
        return await fetchJson(`https://dummyjson.com/users/${userId}`)
    } catch (error) {
        console.error(error.message)

    }
}

(async () => {
    const data = await getChefBirthday(1)
    if (data) {
        console.log("Info richieste", dayjs(data.birthDate).format("DD-MM-YYYY"));
    } else {
        console.log("nessun dato disponibile");

    }
})()



