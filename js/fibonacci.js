const FIBONACCI_MAX_N_VALUE = 50;

document
    .getElementById("fibonacciNumberInput")
    .addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            // Enter key on input works as button click, makes Fibonacci calculation
            document.getElementById("fibonacciButton").click();
        }
    });

document
    .getElementById("fibonacciButton")
    .addEventListener("click", function (event) {
        fibonacci();
    });

function fibonacci() {
    let n = parseInt(document.getElementById("fibonacciNumberInput").value);
    let result = fibonacciCalc(n);

    let resultInput = document.getElementById("result");

    if (result === -1) {
        // if out of bounds...
        result = ""; // blank
    }

    resultInput.innerHTML = result; // result replaced
}

function fibonacciCalc(n) {
    if (!n) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    if (n > 1 && n <= FIBONACCI_MAX_N_VALUE) {
        return fibonacciCalc(n - 1) + fibonacciCalc(n - 2);
    } else {
        // out of bounds
        return -1;
    }
}
