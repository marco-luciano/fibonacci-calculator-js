const FIBONACCI_MAX_N_VALUE = 50;
const FIBONACCI_MAIN_URL = "http://localhost:5050";

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

async function fibonacci() {
    let n = parseInt(document.getElementById("fibonacciNumberInput").value);
    let result = await fibonacciCalc(n);

    let resultInput = document.getElementById("result");

    if (typeof result === "undefined") {
        // if something went wrong (network error, bad request/out of bounds)...
        result = ""; // blank
    }

    resultInput.innerHTML = result; // result replaced
}

async function fibonacciCalc(n) {
    if (n) {
        var result = await fetch(FIBONACCI_MAIN_URL + "/fibonacci/" + n)
            .then(async function (response) {
                if (!response.ok) {
                    // bad request, server error
                    throw Error(await response.text());
                }

                return response.json();
            })
            .then((data) => {
                return data.result;
            })
            // network error
            .catch((error) => console.error(error));
    } else {
        // temporary behavior until next Milestone
        console.error("Error: Not a number");
    }

    return result;
}

// Replaced by server request
function fibonacciCalcIterative(n) {
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

// Replaced by server request
function fibonacciCalcRecursive(n) {
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
