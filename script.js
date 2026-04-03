const screen = document.getElementById('screen');

const allowedKeys = '0123456789+-*/().,^x';

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    const key = event.key;

    if (key === 'Enter') {
        event.preventDefault();
        calculate();
        return;
    }

    if (key === '=') {
        event.preventDefault();
        calculate();
        return;
    }

    if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
        return;
    }

    if (key === 'Escape' || key === 'Delete') {
        event.preventDefault();
        clearScreen();
        return;
    }

    if (key === '^') {
        event.preventDefault();
        appendValue('^');
        return;
    }

    if (allowedKeys.includes(key)) {
        event.preventDefault();
        appendValue(key);
    }
});

// Función para añadir valores a la pantalla
function appendValue(value) {
    screen.value += value;
}

function clearScreen() {
    screen.value = '';
}

function deleteLast() {
    screen.value = screen.value.slice(0, -1);
}

// Función principal de cálculo (Suma, Resta, Mult, Div, Potencia)
function calculate() {
    try {
        if (typeof math === 'undefined') {
            alert('math.js no está cargado');
            return;
        }

        screen.value = math.evaluate(screen.value);
    } catch (error) {
        alert("Expresión inválida");
        clearScreen();
    }
}

// Raíz Cuadrada
function calcSqrt() {
    if (typeof math === 'undefined') {
        alert('math.js no está cargado');
        return;
    }

    const val = math.evaluate(screen.value);
    if (val < 0) {
        alert("Error: Raíz de número negativo");
    } else {
        screen.value = math.sqrt(val);
    }
}

// Resolución de Ecuación Lineal simple: ax + b = 0  => x = -b/a
// El usuario debe ingresar los valores separados por coma: a,b
function solveEquation() {
    const input = screen.value.split(',');
    if (input.length !== 2) {
        alert("Ingresa: a,b para resolver ax+b=0");
        return;
    }
    const a = parseFloat(input[0]);
    const b = parseFloat(input[1]);
    
    if (a === 0) {
        alert("Error: 'a' no puede ser 0");
    } else {
        const x = -b / a;
        screen.value = `x = ${x}`;
    }
}

function showEquationExample() {
    screen.value = '2,-8';
    alert("Ejemplo cargado: 2,-8\nAhora presiona 'Eqn' para resolver 2x-8=0");
}