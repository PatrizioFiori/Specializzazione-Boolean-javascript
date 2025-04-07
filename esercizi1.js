/*
Crea una funzione dichiarativa chiamata somma che accetta due numeri e 
restituisce la loro somma.
Poi, definisci la stessa funzione somma ma come funzione anonima 
assegnata a una variabile
Quindi, riscrivi la funzione somma con la sintassi delle arrow functions.
*/
function somma(a, b) {
    return a + b
}
console.log("somma", somma(2, 2));

const sommaAnonima = function (a, b) {
    return a + b
}

console.log("sommaAnonima", sommaAnonima(5, 5));

const sommaAnonimaArrow = (a, b) => a + b
console.log("sommaAnonimaArrow", sommaAnonimaArrow(10, 5));


/* Crea una arrow function che calcola il quadrato di un numero.
Definisci una funzione chiamata quadrato che accetta un numero e 
restituisce il suo quadrato in una sola riga.
*/
const calcoloQuadratoArrow = numero => numero ** 2
console.log("Calcolo del quadrato di un numero", calcoloQuadratoArrow(10));


/*
Crea una funzione eseguiOperazione
Definisci una funzione eseguiOperazione che accetta tre parametri: 
due numeri e una funzione operatore (callback). 
La funzione deve eseguire l'operazione fornita sui due numeri.
*/
const eseguiOperazionie = (a, b, callback) => callback(a, b);
const sum = (a, b) => a + b;
const sottrazione = (a, b) => a - b;
const divisione = (a, b) => a / b;
const moltiplicazione = (a, b) => a * b;
const potenza = (a, b) => a ** b;
const modulo = (a, b) => a % b;
console.log("somma", eseguiOperazionie(10, 2, sum))
console.log("sottrazione", eseguiOperazionie(10, 2, sottrazione))
console.log("divisione", eseguiOperazionie(10, 2, divisione))
console.log("moltiplicazione", eseguiOperazionie(10, 2, moltiplicazione))
console.log("potenza", eseguiOperazionie(10, 2, potenza))
console.log("modulo", eseguiOperazionie(10, 2, modulo))


/*
Crea un generatore di funzioni creaTimer
Scrivi una funzione creaTimer che accetta un tempo (in ms) 
e restituisce una nuova funzione che avvia un setTimeout per stampare 
"Tempo scaduto!".
*/
function creaTimer(ms, mex) {
    return () => {
        setTimeout(() => {
            console.log(mex);

        }, ms)
    }
}
const Timer = creaTimer(100, "tempo scaduto")
Timer()


/*
Crea una funzione stampaOgniSecondo con setInterval.
Definisci una funzione che accetta un messaggio e 
lo stampa ogni secondo.
Nota: Questa funzione creerà un loop infinito. 
Interrompilo manualmente o usa clearInterval() in un altro script.
*/
function stampaOgniSecondo(messaggio) {
    intervalID = setInterval(() => {
        console.log(messaggio);

    }, 500);

    setTimeout(() => {
        clearInterval(intervalID)
        console.log("Interval bloccato");

        console.log("===========");

    }, 800);
}

stampaOgniSecondo("È passato un secondo")


/*
Crea un contatore automatico con setInterval
Definisci una funzione creaContatoreAutomatico 
che accetta un intervallo di tempo e restituisce una 
funzione che avvia un setInterval, incrementando un contatore 
e stampandolo.
+
Crea una funzione che ferma un timer dopo un certo tempo
Scrivi una funzione eseguiEferma che accetta un messaggio, 
un tempo di avvio e un tempo di stop. Il messaggio deve essere 
stampato a intervalli regolari, ma si deve fermare dopo il 
tempo di stop.
*/


function creaContatoreAutomatico(messaggio, intervallo, stop) {
    let ctr = 0
    return () => {
        const id = setInterval(() => {
            ctr++
            console.log(messaggio + " " + ctr);
        }, intervallo);

        setTimeout(() => {
            clearInterval(id)
            console.log("timer bloccato");

        }, stop);
    }
}

const contatore = creaContatoreAutomatico("il contatore è arrivato a", 1000, 5000)
contatore()


/*
Crea una funzione che simula un conto alla rovescia
Scrivi una funzione contoAllaRovescia che accetta un numero n 
e stampa il conto alla rovescia da n a 0, con un intervallo di 
1 secondo tra ogni numero. Quando arriva a 0, stampa "Tempo scaduto!" 
e interrompe il timer.
*/

function contoAllaRovescia(n) {
    console.log("conto alla rovescia");

    idConto = setInterval(() => {
        console.log(n);
        n--
        if (n == 0) {
            console.log("ZERO!");
            clearInterval(idConto)
        }

    }, 1000);
}

contoAllaRovescia(5)


/*
Creare una funzione che esegue una sequenza di operazioni con ritardi
Scrivi una funzione sequenzaOperazioni che accetta un array 
di operazioni (funzioni) e un tempo di intervallo.
Ogni operazione deve essere eseguita in sequenza con un 
ritardo uguale al tempo di intervallo.
*/

function sequenzaOperazione(operazioni, intervallo) {
    operazioni.forEach((operazione, index) => {
        setTimeout(() => {
            operazione()
            console.log(intervallo * index);

        }, intervallo * index);

    });

}

sequenzaOperazione([
    () => console.log("op1"),
    () => console.log("op2"),
    () => console.log("op3"),
    () => console.log("op4")

], 2000)


/*
Creare un throttler per limitare l’esecuzione di una funzione
Scrivi una funzione creaThrottler che accetta una funzione e un 
tempo `limite`.
Restituisce una nuova funzione che, quando chiamata ripetutamente, 
esegue l'operazione originale al massimo una volta ogni n millisecondi.
*/

function creaThrottler(callback, limite) {
    let ultimaEsecuzione = 0
    return function (...args) {
        const ora = Date.now();
        if (ora - ultimaEsecuzione >= limite) {
            ultimaEsecuzione = ora
            callback(...args)
        } else {
            console.log("non posso eseguire la funzione");
        }
    }
}

const throttleEsecuzione = creaThrottler(() => console.log("eseguito"), 2000);
throttleEsecuzione()
throttleEsecuzione()
setTimeout(throttleEsecuzione, 2500)