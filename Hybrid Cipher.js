const encBtn = document.getElementById("submitEncrypt")
const encMsg = document.getElementById("msgEncrypt")
const pubKey = document.getElementById("recieverPublicKey")

letterArray = ["A" , "B" , "C" , "D" , "E" , "F" , "G" , "H" , "I" , "J" , "K" , "L" , "M" , "N" , "O" , "P" , "Q" , "R" , "S" , "T" , "U" , "V" , "W" , "X" , "Y" , "Z" , "@" , "#" , "$" , "%" , "&"]

const sbox = [
    [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76],
    [0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0],
    [0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15],
    [0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75],
    [0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84],
    [0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf],
    [0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8],
    [0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2],
    [0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73],
    [0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb],
    [0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79],
    [0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08],
    [0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a],
    [0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e],
    [0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf],
    [0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16]
  ];
  
  const rcon = [
    0x00000000, 0x01000000, 0x02000000, 0x04000000, 
    0x08000000, 0x10000000, 0x20000000, 0x40000000, 
    0x80000000, 0x1B000000, 0x36000000
  ];

  const mixColumnMatrix = [
    [0x02, 0x03, 0x01, 0x01],
    [0x01, 0x02, 0x03, 0x01],
    [0x01, 0x01, 0x02, 0x03],
    [0x03, 0x01, 0x01, 0x02]
  ];
  

  
                                    /* Functions */

/* Extra functions for AES KEY Expansion */

function rotWord(x) {
    x = [...x]
    temp = []

    for (let i = 0 ; i < x.length - 2 ; i+=2) { /* No need for changing the last one */
        temp[0] = x[i]
        temp[1] = x[i+1] /* A manual left shift , For AB CD EF GH */
        x[i] = x[i+2]    /* CD AB EF GH Then CD EF AB GH Lastly CD EF GH AB */
        x[i+1] = x[i+3]
        x[i+2] = temp[0]
        x[i+3] = temp[1]
    }
    return x
}

function subWord(x) {
    x = [...x]

    for (let j = 0 ; j < x.length ; j++) {
        if (x[j] == "a" | x[j] == "b" | x[j] == "c" | x[j] == "d" | x[j] == "e" | x[j] == "f") {
            x[j] = parseInt(x[j] , 16) /* This takes the string as hexa and gives decimal */
            /* Solves the problem I was having with x["f"] */
        }
    }

    for (let i = 0 ; i < x.length ; i+=2) {
        temp = sbox[x[i]][x[i+1]].toString(16).padStart(2 , 0)
        x[i] = temp[0]
        x[i+1] = temp[1]
    }
    return x
}

/* Random AES Key generator */

function AESKeyGenerate(AESKEY) {
    for (let i = 0 ; i < 16 ; i++) {
        randomNum = Math.floor(Math.random() * letterArray.length) /* No need for +1 because len is already +1 */
        AESKEY[i] = letterArray[randomNum]
    }
    return AESKEY
}

/* Key Expansion for AES-128 */

function keyExpansion(AESKEY , ENCRYPTKEYEXPANSION) {

    /* Converting AES KEY to HEXA */

    for (let i = 0 ; i < AESKEY.length ; i++) {
        AESKEY[i] = AESKEY[i].charCodeAt().toString(16).padStart(2 , 0) /* charCodeAt gives ASCII Code, toString(16) makes it Hexa Number in string , pad start to pad with leading 0 if needed */
    }

    let i = 0

    for (let j = 0 ; j < AESKEY.length ; j+=4) {
        ENCRYPTKEYEXPANSION[i] = AESKEY[j]+AESKEY[j+1]+AESKEY[j+2]+AESKEY[j+3]
        i++
    }

    /* Key Expansion */

    let k = 4

    while(k < 44) {  /* as 11 round, 4*11 */
        
        if (k % 4 == 0) {   /* if it is first column */
            /* Calculating t */

            t = []
            subRotAns = subWord(rotWord([...ENCRYPTKEYEXPANSION[k-1]]))
            rconAns = rcon[Math.trunc(k/4)].toString(16)
            rconAns = [...rconAns]

            if (rconAns.length != 8) {
                rconAns.unshift('0') /* If there was a leading zero */
            }
  
            for (let i = 0 ; i < subRotAns.length ; i+=2) {
                t1 = parseInt((subRotAns[i] + subRotAns[i+1]) , 16)
                t2 = parseInt((rconAns[i] + rconAns[i+1]) , 16)
                t.push(t1 ^ t2)
            }

            /* Generating key for first column */

            keyExp0 = []
            word0Col = [...ENCRYPTKEYEXPANSION[k-4]]
            let l = 0

            for (let i = 0 ; i < word0Col.length ; i+=2) {
                temp = parseInt((word0Col[i] + word0Col[i+1]) , 16)
                keyExp0.push((t[l] ^ temp).toString(16).padStart(2 , 0))
                l++
            }

            ENCRYPTKEYEXPANSION.push(keyExp0[0]+keyExp0[1]+keyExp0[2]+keyExp0[3]) /* As KeyExp Size is fixed, hand written is not problem here */
        } else {
            /* Generating Key for else */

            keyExp = []
            prevW = [...ENCRYPTKEYEXPANSION[k-1]]
            prevUpW = [...ENCRYPTKEYEXPANSION[k-4]]

            for (let i = 0 ; i < prevW.length ; i+=2) {
                wP = parseInt((prevW[i] + prevW[i+1]) , 16)
                wUP = parseInt((prevUpW[i] + prevUpW[i+1]) , 16)
                keyExp.push((wP ^ wUP).toString(16).padStart(2 , 0))
            }

            ENCRYPTKEYEXPANSION.push(keyExp[0]+keyExp[1]+keyExp[2]+keyExp[3])
        }
        k++
    }
    // console.log(ENCRYPTKEYEXPANSION) /* Finally, ENCRYPTKEYEXPANSION DONE!!! */

    temp = [...ENCRYPTKEYEXPANSION]
    ENCRYPTKEYEXPANSION = []
    k = 0

    for (let i = 0 ; i < 11 ; i++) {
        ENCRYPTKEYEXPANSION[i] = []
        for (let j = 0 ; j < 4 ; j++) {
            ENCRYPTKEYEXPANSION[i][j] = temp[k]
            k++
        }
    }

    return ENCRYPTKEYEXPANSION
}

/* Modifying Message */

function messageBlock (message) {

    /* Making the Message as blocks */

    newMessage = []
    message = [...message]

    if (message.length < 16) {

        newMessage[0] = [...message]
        for (let i = 0 ; i < (16 - message.length) ; i++) {
            newMessage[0].push("Z")
        }

    } else if (message.length > 16) {

        n = Math.trunc(message.length / 16)
        let k = 0
        while (k < message.length) {
            for (let i = 0 ; i <= n ; i++) {
                newMessage[i] = []  /* Need to make an empty array at i first */
                for (let j = 0 ; j < 16 ; j++) {
                    newMessage[i][j] = message[k]
                    k++
                    if (newMessage[i][j] == undefined) {
                        newMessage[i][j] = "Z"
                    }
                }
            }
        }
    }
    
    /* Converting to HEXA */

    for (i = 0 ; i < newMessage.length ; i++) {
        for (let j = 0 ; j < 16 ; j++) {
            newMessage[i][j] = newMessage[i][j].charCodeAt().toString(16).padStart(2 , 0)
        }
    }
    return newMessage
}

/* Extra Function for AES Encryption */

function subBytes (x) {
    for (let i = 0 ; i < 4 ; i++) {
        for (let j = 0 ; j < 4 ; j++) {
            temp = [...x[i][j]]
            if (temp[0] ==  "a" | temp[0] == "b" | temp[0] == "c" | temp[0] == "d" | temp[0] == "e" | temp[0] == "f") {
                temp[0] = parseInt(temp[0] , 16)
            } else if ( temp[1] == "a" | temp[1] == "b" | temp[1] == "c" | temp[1] == "d" | temp[1] == "e" | temp[1] == "f") {
                temp[1] = parseInt(temp[1] , 16)
            }
            x[i][j] = sbox[temp[0]][temp[1]].toString(16).padStart(2 , 0)
        }
    }
    return x
}

function shiftRows (x) {
    for (let i = 0 ; i < 4 ; i++) {
        if (i == 1) {
            y = rotWord(x[i][0] + x[i][1] + x[i][2] + x[i][3])
            x[i][0] = y[0] + y [1]
            x[i][1] = y[2] + y [3]
            x[i][2] = y[4] + y [5]
            x[i][3] = y[6] + y [7]
        } else if (i == 2) {
            y = rotWord(rotWord(x[i][0] + x[i][1] + x[i][2] + x[i][3]))
            x[i][0] = y[0] + y [1]
            x[i][1] = y[2] + y [3]
            x[i][2] = y[4] + y [5]
            x[i][3] = y[6] + y [7]
        } else if (i == 3) {
            y = rotWord(rotWord(rotWord(x[i][0] + x[i][1] + x[i][2] + x[i][3])))
            x[i][0] = y[0] + y [1]
            x[i][1] = y[2] + y [3]
            x[i][2] = y[4] + y [5]
            x[i][3] = y[6] + y [7]
        }               
    }
    return x
    /* It's like this becuase I used existing function rotWord() , which is structured a
    bit differently */
}

function GaloisField (a , b) {
    if (a * b > 255) {
        return ((a * b) % 256)
    } else {
        return a * b
    }
}

function mixColumns (x) {
    temp = []
    for (let i = 0 ; i < 4 ; i++) {
        temp[i] = []
        for (let j = 0 ; j < 4 ; j++) {
            temp[i][j] = (GaloisField(mixColumnMatrix[j][0] , parseInt(x[0][i] , 16)) ^ GaloisField(mixColumnMatrix[j][1] , parseInt(x[1][i] , 16)) ^ GaloisField(mixColumnMatrix[j][2] , parseInt(x[2][i] , 16)) ^ GaloisField(mixColumnMatrix[j][3] , parseInt(x[3][i] , 16))).toString(16).padStart(2 , 0)
        }
    }
    for (let i = 0 ; i < 4 ; i++) {
        for (let j = 0 ; j < 4 ; j++) {
            x[j][i] = temp[i][j]
        }
    }
    return x
    /* Very Very Dangerous Function, may cause many problem. Need Inverse number for Decryption */
}

function addRoundKey (x , key) {
    
    /* Arranging Key */

    let keyUse = new Array([] , [] , [] , [])
    let k = l = 0
    
    for(let i = 0 ; i < 4 ; i++) {
        for(let j = 0 ; j < 4 ; j++) {
            keyUse[j][i] = key[k][l] + key[k][l+1]
            l+=2
        }
        k++
        l = 0
    }

    /* Adding Round Key */

    let temp = new Array([] , [] , [] , [])

    for(let i = 0 ; i < 4 ; i++) {
        for(let j = 0 ; j < 4 ; j++) {
            temp[i][j] = (parseInt(x[i][j] , 16) ^ parseInt(keyUse[i][j] , 16)).toString(16).padStart(2 , 0)
        }
    }
    x = [...temp]
    return x
}

/* AES Encryption Function */

function AESEncryption (fractionMessage , keyExpansion) {

    /* Making the message as 4*4 */

    fracUpdMsg = []

    for (let i = 0 ; i < 4 ; i++) {
        fracUpdMsg[i] = []
        for (let j = 0 ; j < 4 ; j++) {
            fracUpdMsg[i][j] = fractionMessage[j * 4 + i]
            /* Suddenly came to my mind, for AES row should be 1 4 8 12 , 2 5 9 13 , 3 6 10 14
            so as column are increasing by 4 , let j * 4. But for each i it is becoming the same
            but row is increasing by 1 , so lets add + i, it becomes j * 4 + i */
            /* It will also be useful when arranging Key for addRoundKey() */
        }
    }

    /* Iterate Rounds */

    for (let i = 0 ; i < 11 ; i++) { // One pre-round and 10 rounds for AES-128
        if (i == 0) {
            fractionMessage = addRoundKey(fractionMessage , keyExpansion[i])
        } else if (i == 10) {
            fractionMessage = addRoundKey(shiftRows(subBytes(fractionMessage)) , keyExpansion[i])
        } else {
            fractionMessage = addRoundKey(mixColumns(shiftRows(subBytes(fractionMessage))) , keyExpansion[i])
        }
        console.log(fractionMessage) /* Cant Encrypt all round, check problem! */
    }
}


                                    /* Main() */

/* Checking if input is not null */

encBtn.onclick = () => {
    if (encMsg.value && pubKey.value) {
        encryptMessage = encMsg.value
        publicKey = pubKey.value

        let AESKEY = []
        let ENCRYPTKEYEXPANSION = []
        let UPDATEDHEXAMESSAGE = []

        /* Key generation */
        AESKEY = AESKeyGenerate(AESKEY)
        ENCRYPTKEYEXPANSION = keyExpansion(AESKEY , ENCRYPTKEYEXPANSION)

        /* Message Processing */
        UPDATEDHEXAMESSAGE = messageBlock(encryptMessage)

        /* AES Encryption */

        for (let i = 0 ; i < UPDATEDHEXAMESSAGE.length ; i++) {
            AESEncryption(UPDATEDHEXAMESSAGE[i] , ENCRYPTKEYEXPANSION)
        }
        

    } else {
        console.log("False")
    }
}