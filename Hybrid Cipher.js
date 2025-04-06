const encBtn = document.getElementById("submitEncrypt")
const encMsg = document.getElementById("msgEncrypt")
const pubKey = document.getElementById("recieverPublicKey")

letterArray = ["A" , "B" , "C" , "D" , "E" , "F" , "G" , "H" , "I" , "J" , "K" , "L" , "M" , "N" , "O" , "P" , "Q" , "R" , "S" , "T" , "U" , "V" , "W" , "X" , "Y" , "Z" , "@" , "#" , "$" , "%" , "&"]

const AESKEY = []
const KEYEXPANSION = []
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

  
                                    /* Functions */

/* Extra functions for AES KEY Expansion */

function rotWord(x) {
    x = [...x]
    temp = []
    
    for (i = 0 ; i < x.length - 2 ; i+=2) { /* No need for changing the last one */
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

    for (j = 0 ; j < x.length ; j++) {
        if (x[j] == "a" | x[j] == "b" | x[j] == "c" | x[j] == "d" | x[j] == "e" | x[j] == "f") {
            x[j] = parseInt(x[j] , 16) /* This takes the string as hexa and gives decimal */
            /* Solves the problem I was having with x["f"] */
        }
    }

    for (i = 0 ; i < x.length ; i+=2) {
        temp = sbox[x[i]][x[i+1]].toString(16).padStart(2 , 0)
        x[i] = temp[0]
        x[i+1] = temp[1]
    }
    return x
}

/* Random AES Key generator */

function AESKeyGenerate() {
    for (i = 0 ; i < 16 ; i++) {
        randomNum = Math.floor(Math.random() * letterArray.length) /* No need for +1 because len is already +1 */
        AESKEY[i] = letterArray[randomNum]
    }
}

/* Key Expansion for AES-128 */

function keyExpansion() {

    /* Converting AES KEY to HEXA */

    for (i = 0 ; i < AESKEY.length ; i++) {
        AESKEY[i] = AESKEY[i].charCodeAt().toString(16).padStart(2 , 0) /* charCodeAt gives ASCII Code, toString(16) makes it Hexa Number in string , pad start to pad with leading 0 if needed */
    }

    i = 0

    for (j = 0 ; j < AESKEY.length ; j+=4) {
        KEYEXPANSION[i] = AESKEY[j]+AESKEY[j+1]+AESKEY[j+2]+AESKEY[j+3]
        i++
    }

    /* Key Expansion */

    k = 4

    while(k < 44) {  /* as 11 round, 4*11 */
        
        if (k % 4 == 0) {   /* if it is first column */
            /* Calculating t */

            t = []
            subRotAns = subWord(rotWord([...KEYEXPANSION[k-1]]))
            rconAns = rcon[Math.trunc(k/4)].toString(16)
            rconAns = [...rconAns]

            if (rconAns.length != 8) {
                rconAns.unshift('0') /* If there was a leading zero */
            }
  
            for (i = 0 ; i < subRotAns.length ; i+=2) {
                t1 = parseInt((subRotAns[i] + subRotAns[i+1]) , 16)
                t2 = parseInt((rconAns[i] + rconAns[i+1]) , 16)
                t.push(t1 ^ t2)
            }

            /* Generating key for first column */

            keyExp0 = []
            word0Col = [...KEYEXPANSION[k-4]]
            l = 0

            for (i = 0 ; i < word0Col.length ; i+=2) {
                temp = parseInt((word0Col[i] + word0Col[i+1]) , 16)
                keyExp0.push((t[l] ^ temp).toString(16).padStart(2 , 0))
                l++
            }

            KEYEXPANSION.push(keyExp0[0]+keyExp0[1]+keyExp0[2]+keyExp0[3]) /* As KeyExp Size is fixed, hand written is not problem here */
        } else {
            /* Generating Key for else */

            keyExp = []
            prevW = [...KEYEXPANSION[k-1]]
            prevUpW = [...KEYEXPANSION[k-4]]

            for (i = 0 ; i < prevW.length ; i+=2) {
                wP = parseInt((prevW[i] + prevW[i+1]) , 16)
                wUP = parseInt((prevUpW[i] + prevUpW[i+1]) , 16)
                keyExp.push((wP ^ wUP).toString(16).padStart(2 , 0))
            }

            KEYEXPANSION.push(keyExp[0]+keyExp[1]+keyExp[2]+keyExp[3])
        }
        k++
    }
    console.log(KEYEXPANSION) /* Finally, KEYEXPANSION DONE!!! */
}


                                    /* Main() */

/* Checking if input is not null */

encBtn.onclick = () => {
    if (encMsg.value && pubKey.value) {
        encryptMessage = encMsg.value
        publicKey = pubKey.value

        AESKeyGenerate()
        keyExpansion()

    } else {
        console.log("False")
    }
}