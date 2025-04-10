/*
In questo esercizio, utilizzerai Promise.all() 
per creare la funzione getDashboardData(query), 
che accetta una città come input e recupera simultaneamente:

- Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
- Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà 
temperature e weather).
- Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).

Utilizzerai Promise.all() per eseguire queste richieste in parallelo 
e poi restituirai un oggetto con i dati aggregati.
*/

/*
🎯 Bonus 1 - Risultato vuoto
Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione,
semplicemente i dati relativi a quella chiamata verranno settati a null 
e  la frase relativa non viene stampata. Testa la funzione con la 
query “vienna” (non trova il meteo).

🎯 Bonus 2 - Chiamate fallite
Attualmente, se una delle chiamate fallisce, 
**Promise.all()** rigetta l'intera operazione.

Modifica `getDashboardData()` per usare **Promise.allSettled()**, 
in modo che:
Se una chiamata fallisce, i dati relativi a quella chiamata 
verranno settati a null.
Stampa in console un messaggio di errore per ogni richiesta fallita.
Testa la funzione con un link fittizio per il meteo 
(es. https://www.meteofittizio.it).
*/

async function fetchJson(url) {
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(console.error(res.status))
        }
        return await res.json()
    } catch (error) {
        console.error("errore nel recupero dati", error)
        return null
    }
}

async function getDashboardData(query) {
    try {
        const endPoints = ["destinations", "weathers", "airports"]
        const promises = endPoints.map(endPoint => fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/${endPoint}?search=${query}`))
        const results = await Promise.allSettled(promises)

        const desRes = results[0].status === "fulfilled" ? results[0].value[0] : null
        const meteoRes = results[1].status === "fulfilled" ? results[1].value[0] : null
        const airportsRes = results[2].status === "fulfilled" ? results[2].value[0] : null

        return {
            city: desRes?.name ?? "sconosciuto",
            country: desRes?.country ?? "sconosciuto",
            temperature: meteoRes?.temperature ?? "sconosciuto",
            weather: meteoRes?.weather_description ?? "sconosciuto",
            airports: airportsRes?.name ?? "sconosciuto",

        };

    } catch (error) {
        console.error("Errore nella raccolta dati:", error);
        return null;
    }

}

(async () => {
    const log = await getDashboardData("Vienna")
    console.log(log);

})()