
// Arrow Function


const soma = (a, b) => a + b;

console.log(soma(50, 30));



// Função Tradicional

function somatradicional(d, f) {
    return d + f;
}


console.log(somatradicional(50, 50));

// Array com função

const numeros = [100, 30, 80, 90];

let somar = 0;

function somando() {
    for (let i = 0; i < numeros.length; i++) {
        somar += numeros[i];
    }

    return somar;

}

const resultadoSoma = somando(); 
console.log(resultadoSoma);



