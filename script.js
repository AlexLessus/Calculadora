const screen = document.getElementById('screen');

const allowedKeys = '0123456789+-*/().,ab';

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    const key = event.key;

    if (key === 'Enter') {
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
        appendValue('**');
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
        const expression = screen.value.replace(/\^/g, '**');
        // eval() es práctico para prototipos, pero en producción 
        // usaremos parsers más seguros para evitar inyecciones.
        screen.value = eval(expression);
    } catch (error) {
        alert("Expresión inválida");
        clearScreen();
    }
}

// Raíz Cuadrada
function calcSqrt() {
    const val = parseFloat(screen.value);
    if (val < 0) {
        alert("Error: Raíz de número negativo");
    } else {
        screen.value = Math.sqrt(val);
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