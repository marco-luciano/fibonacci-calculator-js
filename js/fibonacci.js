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
    } else if (n === 1) {
        return 1;
    } else if (n > 0 && n <= FIBONACCI_MAX_N_VALUE) {
        let result = 0;

        // set i and j counters as 0 and 1, initial values of fibonacci series
        let i = 0;
        let j = 1;

        for (let k = 1; k < n; k++) {
            result = i + j;
            i = j;
            j = result;
        }

        return result;
    } else {
        return -1;
    }
}
