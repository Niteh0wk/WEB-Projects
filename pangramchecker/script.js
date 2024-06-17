let string1 = "Hello World"
let string2 = "The quick fox jUMps over the dog"


function isPangram(string) {
    const lowerCaseString = string.toLowerCase();
    const letters = new Set();
    for (let char of lowerCaseString) {
        if (char >= 'a' && char <= 'z') {
            // Add the letter to the set
            letters.add(char);
        }
    }
    return letters.size === 26;
}

function checkPangram() {
    document.getElementById('isPangram1').textContent = "Is pangram: " + isPangram(string1);
    document.getElementById('isPangram2').textContent = "Is pangram: " + isPangram(string2);
}