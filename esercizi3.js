/*
Ottieni il titolo di un post con una Promise.
Crea una funzione getPostTitle(id) che accetta un id e restituisce 
una Promise che recupera il titolo di un post dal link 
https://dummyjson.com/posts/{id}
🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. 
Concatena una seconda chiamata che aggiunge una proprietà user 
che contiene i dati dell'autore, recuperati dalla chiamata 
https://dummyjson.com/users/{post.userId}.
*/

function getPost(id) {
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(response => response.json())
            .then(post => {
                fetch(`https://dummyjson.com/users/${post.userId}`)
                    .then(response => response.json())
                    .then(user => resolve({ ...post, user }))
                    .catch(reject)
            })
            .catch(reject)

    })
}

getPost(1)
    .then(post => console.log("post completo ", post))
    .catch(err => console.error(err));




/*
Crea la funzione lanciaDado() che restituisce una Promise che, 
dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, 
nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una 
closure che memorizza l'ultimo risultato. 
Se il numero esce due volte di fila, stampa "Incredibile!".
*/

function creaLanciaDado() {
    let ultimoRisultato = null
    return function (numeroFacce) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let risultato = Math.floor(Math.random() * numeroFacce) + 1
                if (Math.random() < 0.2) {
                    return reject("dado incastrato")
                }
                else if (!ultimoRisultato) {
                    ultimoRisultato = risultato
                    return resolve(risultato)

                } else if (ultimoRisultato == risultato) {
                    return resolve("Incredibile hai ottenuto due volte " + risultato)
                }


            }, 1);
        })
    }
}

const lancioDado = creaLanciaDado()

lancioDado(1)
    .then(res => {
        console.log(res)
        lancioDado(1)  // Il secondo lancio avviene solo dopo il primo
            .then(res => console.log(res))
            .catch(incastro => console.log(incastro))

    })
    .catch(incastro => console.log(incastro))