const books = [
    {
        title: "React Billionaire",
        pages: 250,
        author: {
            name: 'Alice',
            age: 35
        },
        available: false,
        price: '101€',
        tags: ['advanced', 'js', 'react', 'senior']
    },
    {
        title: "Advanced JS",
        pages: 500,
        author: {
            name: 'Bob',
            age: 20
        },
        available: true,
        price: '25€',
        tags: ['advanced', 'js', 'mid-senior']
    },
    {
        title: "CSS Secrets",
        pages: 320,
        author: {
            name: 'Alice',
            age: 17
        },
        available: true,
        price: '8€',
        tags: ['html', 'css', 'junior']
    },
    {
        title: "HTML Mastery",
        pages: 200,
        author: {
            name: 'Charlie',
            age: 50
        },
        available: false,
        price: '48€',
        tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
];




//Crea un array (longBooks) con i libri che hanno più di 300 pagine;
const longBooks = books.filter(book => book.pages >= 300)
console.log("libri con 300 pagine o più", longBooks);


//Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
const longBooksTitles = longBooks.map(book => book.title)
console.log("titoli", longBooksTitles);



//Creare un array (availableBooks) che contiene tutti i libri disponibili.
const availableBooks = books.filter(book => book.available)
console.log("libri disponibili", availableBooks);


//Crea un array (discountedBooks) con gli availableBooks, 
// ciascuno con il prezzo scontato del 20% 
// (mantieni lo stesso formato e arrotonda al centesimo)
const discountedBooks = availableBooks.map(book => {
    const parsedValue = parseInt(book.price)
    const newPrice = parsedValue * 0.8
    return {
        ...book,
        price: newPrice + "€"
    }
})
console.log("libri scontati", discountedBooks);



//Salva in una variabile (fullPricedBook) il primo elemento 
// di discountedBooks che ha un prezzo intero (senza centesimi).
const fullPricedBook = discountedBooks.find(book => {
    if (Number.isInteger(parseInt(book.price))) {
        return book
    }
})
console.log("libro senza virgole", fullPricedBook);


//Creare un array (authors) che contiene gli autori dei libri.
//Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.

const authors = books.map(book => {
    return {
        ...book.author,
        areAuthorsAdults: book.author.age >= 18
    }
})
console.log("autori maggiorenni ", authors);


//Ordina l’array authors in base all’età, senza creare un nuovo array.
// (se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)

let authorRiordinato = [...authors] //copia fatta per vedere meglio in fase di log

authorRiordinato.sort((a, b) => {
    return authors.areAuthorsAdults ? b.age - a.age : a.age - b.age
})
console.log("Autori ordinati per eta ", authorRiordinato);



//Creare un array (ages) che contiene le età degli autori dei libri.
const ages = books.map(book => book.author.age)
console.log("eta degli autori ", ages)

//Calcola la somma delle età (agesSum) usando reduce.
const ageSum = ages.reduce((accumulatore, elementoCorrente) => {
    return accumulatore + elementoCorrente

}, 0)
console.log("somma dell'eta degli autori", ageSum);

//Stampa in console l’età media degli autori dei libri.

const agesMed = ages.reduce((accumulatore, elementoCorrente, index, array) => {
    accumulatore += elementoCorrente
    return accumulatore
}, 0) / ages.length

console.log("media dell'eta degli autori ", agesMed);


/*
Snack 5 (Bonus) - Raccogli i libri
Usando la l'API 
https://boolean-spec-frontend.vercel.app/freetestapi/books/{id} 
usa la combinazione di .map() e Promise.all(), 
per creare una funzione (getBooks) 
che a partire da un array di id (ids), 
ritorna una promise che risolve un array di libri (books).
Testala con l’array [2, 13, 7, 21, 19] .
*/


async function fetchJson(url) {
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(console.error(res.status))
        return res.json()
    } catch (error) {
        console.error("errore nel recupero dati", error)
        return null
    }


}

async function getBooks(ids) {
    const promises = ids.map(id => fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/books/${id}`))
    let response = Promise.all(promises)
    return response

}


(async () => {
    const log = await getBooks([2, 13, 7, 21, 19])
    console.log("log del fetch dei libri", log);

})()



// Crea una variabile booleana (areThereAvailableBooks) 
// per verificare se c’è almeno un libro disponibile.

const areThereAvailableBooks = books.some(book => book.available)
message = areThereAvailableBooks ? "almeno un libro è disponibile" : "nessun libro è disponibile"
console.log(message, areThereAvailableBooks);


// Crea un array (booksByPrice) con gli elementi di books 
// ordinati in base al prezzo (crescente).
// Ordina l’array booksByPricein base alla disponibilità 
// (prima quelli disponibili), senza creare un nuovo array.

const booksByPrice = books.sort((a, b) => {
    let parsedA = parseInt(a.price)
    let parsedB = parseInt(b.price)
    return parsedA - parsedB
})

booksByPrice.sort((a, b) => {
    return a.available - b.available
})

console.log("libri ordinati per disponibilità", booksByPrice);




/*
Usa reduce per creare un oggetto (tagCounts) 
che conta quante volte ogni tag viene usato tra i libri.
*/

const tagCounts = books.reduce((accumulatore = {}, valoreCorrente) => {
    for (let value of valoreCorrente.tags) {
        accumulatore[value] = (accumulatore[value] || 0) + 1
    }

    return accumulatore
}, {})

console.log(tagCounts);