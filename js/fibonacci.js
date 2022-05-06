document
    .getElementById("fibonacciNumberInput")
    .addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            // Enter key on input works as button click, makes Fibonacci calculation
            document.getElementById("fibonacci-button").click();
        }
    });

function fibonacci() {
    let n = parseInt(document.getElementById("fibonacciNumberInput").value);
    let result = fibonacciCalc(n);

    let resultInput = document.getElementById("result");
    resultInput.innerHTML = result; // result replaced
}

function fibonacciCalc(n) {
    if (!n) {
        console.log("n = 0");
        console.log(0);
        return 0;
    } else if (n === 1) {
        console.log("n = 1");
        console.log(1);
        return 1;
    } else {
        let result = 0;

        // set i and j counters as 0 and 1, initial values of fibonacci series
        let i = 0;
        let j = 1;

        for (let k = 1; k < n; k++) {
            result = i + j;
            i = j;
            j = result;
        }

        console.log("n = " + n);
        console.log(result);

        return result;
    }
}
