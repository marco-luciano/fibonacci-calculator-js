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
        hideAlerts();
        showSpinner();

        fibonacci();
    });

async function fibonacci() {
    let n = parseInt(document.getElementById("fibonacciNumberInput").value);

    let result = await fibonacciCalc(n);

    if (typeof result === "undefined") {
        // if something went wrong (network error, bad request/out of bounds)...
        result = ""; // blank
    }

    hideSpinner();
    showResult(result);
}

async function fibonacciCalc(n) {
    if (n >= 0 && n <= 50) {
        var result = await fetch(FIBONACCI_MAIN_URL + "/fibonacci/" + n)
            .then(async function (response) {
                if (!response.ok) {
                    throw Error(await response.text());
                }
                return response.json();
            })
            .then((data) => {
                return data.result;
            })
            .catch(async function (error) {
                displayServerError("Server " + error);
            });
    } else if (n >= 50) {
        await displayValidationError("Can’t be larger than 50");
    } else {
        await displayValidationError("Error: Not a valid number");
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

function hideSpinner() {
    let spinner = document.getElementById("fibonacciSpinner");
    spinner.style.setProperty("display", "none");
}

function showSpinner() {
    let spinner = document.getElementById("fibonacciSpinner");
    spinner.style.setProperty("display", "block");
}

function hideResult() {
    let resultInput = document.getElementById("result");
    result.style.setProperty("display", "none");
}

function showResult(result) {
    let resultInput = document.getElementById("result");

    resultInput.innerHTML = result; // result replaced

    resultInput.style.setProperty("display", "block");
}

function hideValidationError() {
    let validation = document.getElementById("alertValidation");
    validation.style.setProperty("display", "none");
}

async function displayValidationError(message) {
    let validation = document.getElementById("alertValidation");
    validation.innerHTML = message;
    validation.style.display = "block";
}

function hideServerError() {
    let validation = document.getElementById("alertServer");
    validation.style.setProperty("display", "none");
}

function displayServerError(message) {
    let alertServer = document.getElementById("alertServer");
    alertServer.innerHTML = message;
    alertServer.style.display = "block";
}

function hideAlerts(){
    hideResult();
    hideValidationError();
    hideServerError();
}

