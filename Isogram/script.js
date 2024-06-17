let string1 = "ambidExtRously";
let string2 = "patteRN";


function isIsogram(string) {
    string = string.toLowerCase();

    let letterCounts = {};
    for (let i = 0; i < string.length; i++) {
        let letter = string[i];

        if (letterCounts[letter]) {
            return false;
        }

        letterCounts[letter] = 1;
    }
    return true;
}

function checker(){
    document.getElementById('check1').innerText = isIsogram(string1);
    document.getElementById('check2').innerText = isIsogram(string2);
}