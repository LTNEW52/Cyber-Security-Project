const encBtn = document.getElementById("submitEncrypt")
const encMsg = document.getElementById("msgEncrypt")
const pubKey = document.getElementById("recieverPublicKey")

letterArray = ["A" , "B" , "C" , "D" , "E" , "F" , "G" , "H" , "I" , "J" , "K" , "L" , "M" , "N" , "O" , "P" , "Q" , "R" , "S" , "T" , "U" , "V" , "W" , "X" , "Y" , "Z" , "@" , "#" , "$" , "%" , "&"]

const AESKEYLetter = []
const AESKEY = []

/* Checking if input is not null */

encBtn.onclick = () => {
    if (encMsg.value && pubKey.value) {
        encryptMessage = encMsg.value
        publicKey = pubKey.value

        AESKeyGenerate()
    
        
    } else {
        console.log("False")
    }
}

/* Random AES Key generator */

function AESKeyGenerate() {
    for (i = 0 ; i < 8 ; i++) {
        randomNum = Math.floor(Math.random() * letterArray.length) /* No need for +1 because len is already +1 */
        AESKEYLetter[i] = letterArray[randomNum]
    }

    /* AES Key to number convert */

    k = 0

    for (j = 0 ; j < 8 ; j++) {     /* As AES-128 have 16 byte */
        AESKEY[k] = Math.trunc((letterArray.indexOf(AESKEYLetter[j]) + 1) / 10)
        k++
        AESKEY[k] = Math.trunc((letterArray.indexOf(AESKEYLetter[j]) + 1) % 10)
        k++
    }
}


/* Key Expansion for AES-128 */


