const FIBONACCI_MAX_N_VALUE = 50;
const FIBONACCI_MAIN_URL = "http://localhost:5050";

window.addEventListener("load", (event) => {
    loadFibonacciResults(drawFibonacciResults);
});

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
        showElement("fibonacciSpinner");
        fibonacci();
    });

function fibonacci() {
    let n = parseInt(document.getElementById("fibonacciNumberInput").value);
    let calc = fibonacciCalc(n);
}

function fibonacciCalc(n) {
    if (n >= 0 && n <= 50) {
        let result = fetch(FIBONACCI_MAIN_URL + "/fibonacci/" + n)
            .then(function (response) {
                if (!response.ok) {
                    return response.text();
                }
                return response.json();
            })
            .then((data) => {
                hideElement("fibonacciSpinner");

                if (data.number) {
                    showResult(data.result);
                    loadFibonacciResults(drawFibonacciLastResult);
                } else {
                    displayServerError("Server " + data);
                }
            })
            .catch(function (error) {
                displayServerError("Server " + error);
            });

        return result;
    } else if (n >= 50) {
        displayValidationError("Can’t be larger than 50");
    } else {
        displayValidationError("Error: Not a valid number");
    }
}

function loadFibonacciResults(callback) {
    showElement("fibonacciResultsSpinner");
    let results = fetch(FIBONACCI_MAIN_URL + "/getFibonacciResults")
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.text());
            }
            return response.json();
        })
        .then(function (data) {
            fibonacciRecords = data;
            // sort results descending by timestamp
            fibonacciRecords.results.sort(
                (x, y) => y.createdDate - x.createdDate
            );
            callback(fibonacciRecords);
            hideElement("fibonacciResultsSpinner");
            return fibonacciRecords;
        })
        .catch(function (error) {
            displayServerError("Server " + error);
        });

    return results;
}

function hideElement(id) {
    let element = document.getElementById(id);
    element.style.setProperty("display", "none");
}

function showElement(id) {
    let element = document.getElementById(id);
    element.style.setProperty("display", "block");
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

function displayValidationError(message) {
    let validation = document.getElementById("alertValidation");
    validation.innerHTML = message;
    validation.style.display = "block";
    hideElement("fibonacciSpinner");
}

function hideServerError() {
    let validation = document.getElementById("alertServer");
    validation.style.setProperty("display", "none");
}

function displayServerError(message) {
    let alertServer = document.getElementById("alertServer");
    alertServer.innerHTML = message;
    alertServer.style.display = "block";
    hideElement("fibonacciSpinner");
}

function hideAlerts() {
    hideResult();
    hideValidationError();
    hideServerError();
}

function drawFibonacciResults(results) {
    results.results.forEach(function (element) {
        const record = document.createElement("tr");
        record.className = "fibonacci-record";
        record.innerHTML = formatFibonacciRecord(element);
        document
            .querySelector(".fibonacci-results .fibonacci-results-table")
            .append(record);
    });
}

function drawFibonacciLastResult(results) {
    const record = document.createElement("tr");
    record.className = "fibonacci-record";
    record.innerHTML = formatFibonacciRecord(results.results[0]);
    document
        .querySelector(".fibonacci-results .fibonacci-results-table")
        .prepend(record);
}

function formatFibonacciRecord(record) {
    let date = new Date(record["createdDate"]);
    text = `The Fibonnaci Of <b>${record["number"]}</b> is <b>${record.result}</b>. Calculated at: ${date} `;
    return text;
}
