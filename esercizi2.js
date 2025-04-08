/*
Crea una funzione che permette la copia profonda (deep copy) 
di un oggetto, che copia anche i suoi metodi 
(proprietà che contengono funzioni). 
Usa l’oggetto di Code Question 6 come test.
⚠️ Serve usare una funzione ricorsiva! (fai un po’ di ricerca).
*/

const chef = {
    name: "Chef Hyur",
    age: 29,
    makeBurger: (num = 1) => {
        console.log(`Ecco ${num} hamburger per te!`);
    },
    restaurant: {
        name: "Hyur's Burgers",
        welcomeClient: () => {
            console.log("Benvenuto!");
        },
        address: {
            street: 'Main Street',
            number: 123,
            showAddress: () => {
                console.log("Main Street 123");
            }
        },
        isOpen: true,
        tags: ["A", "B", "C"]
    }
}

const arrayDiProva = [
    {
        nome: "Mario",
        cognome: "Rossi",
        Info: ["A", "B", "C"]
    },
    {
        nome: "Marco",
        cognome: "Bianchi",
        funzione: () => {
            console.log("ciao");
        }
    },
    {
        nome: "Carlo",
        cognome: "Verdi",
    },
]



function deepCopy(obj) {

    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    let newObj = Array.isArray(obj) ? [] : {}

    for (let key in obj) {

        if (typeof obj[key] == "object") {
            newObj[key] = deepCopy(obj[key])

        } else {
            newObj[key] = obj[key]
        }

    }

    return newObj
}



// Creazione della copia
const chefCopia = deepCopy(chef);
const arrayDiProvaCopia = deepCopy(arrayDiProva)

// 🔧 Modifiche solo sulla copia
chefCopia.name = "Chef Copia";
chefCopia.restaurant.name = "Fake Burgers";
chefCopia.restaurant.tags.push("Z");
chefCopia.makeBurger = () => console.log("Sono una copia!");
chefCopia.restaurant.address.number = 999;
chefCopia.restaurant.address.showAddress = () => console.log("Sono una copia 2!");

// ✅ Output per confronto
console.log("🔹 ORIGINALE:");
console.log(chef);

console.log("🔸 COPIA MODIFICATA:");
console.log(chefCopia);

console.log("🔸 COPIA DI ARRAY:");
console.log(arrayDiProvaCopia);
