# Cyber-Security-Project

Welcome to my Cyber-Security Project. Me, Labib Tahmid, is trying my best to implement hybrid cipher, a web based project which uses AES encryption and RSA encryption(For now , I will try for decryption also!). This Readme file will be basically my project log, focusing day to day work and also how it works.

1. 03 April 2025

Starting my project. Have a outline for the project, lets see how much I can progress!

Forgot many things about web programming, This project is going to be a good way to revise them!

So generating the AES key was simpler but took many time because I overly complicated it. I was trying to convert 16 length letter to 16 length number, with double transposition and etc.

Actually it was easy by taking the key size 8 length letter, because 8 length letter can give 16 length number!

This for today, next day will work on Key expansion!

2. 04 April 2025

Worked on Key expansion today, mainly word(0) part. It was tough, rotating and subsitution could be done better, but sticked with the knowledge I have.

Rotating and subsitituion works alright, but i am seeing some "undefined" problem when calling both. Some numbers issue i think, will work on it maybe tomorrow.

After that key expansion will probably finish, very little is left!

3. 06 April 2025 - 07 April 2025

Finally finished Key expansion today! It was hard maintaining all things, small slip up gave a lot of trouble, such as not padding properly gave undefined error, as each key is dependent on other keys!

Still found all the errors and solved them, hope there is no more errors! Now I will move to main AES Encryption, probably after 2 days, I have some work to do!

All 44 Key looked majestic!

4. 10 April 2025

Started working on AES Encryption, but realized I have to modify the message as blocks and need to pad it if necessary. Also made it hexa.

After that made it 4\*4 State matrix. I first thought the matrix will be row by row, but later realized the matrix must be column by column. But it was useful because I need to do the same with keys.

Tomorrow I will work on the main AES functions!

5. 11 April 2025

Completed subBytes and shiftRows. Worked on mixcolumn but it is very very complicated! Many errors are showing up, so I need to work on that tomorrow!

6. 12 April 2025

Finished MixColumn. There is a huge But here, for other functions I ignored the bit calculation, and those work, but for this GF(2^n) was bit calculation. I implemented a decimal way, but not sure how well it worked. I am curious about reversing process. While it is possible to reverse, by finding Inverse of the number, which is additional pain, but I think logic will work just fine. If not , DEAD END!

Also finished add Round Key, All the components are complete! But as usual, There is some problem. It is getting stuck round 2 or 3. Need to check it tomorrow!

After that will start working on RSA. Another Tough Algorithm!

7. 13 April 2025

Finished AES Encryption Atlast. Previous problem was, not properly converting hexa to decimal for subBytes. After that it was straightforward, Just modifying for a long encrypt message string. Did more work on main Webpage, like adding animations, rearranging components to show the encrypted message.

Also started basic work on RSA. We need 16 byte RSA prime(not practical but works for this project), which is tough to get manually. So I got 20 prime numbers and stored it as array, just as random AES key, I will pick random prime number from them!

Also I need to show the user public & private key. Again not practical, but for this project I am not focusing on secure private public key exchange. The main goal is understanding the algorithm and they are fun! And also pain 😣.

8. 16 April 2025

Didn't do much today, some HTML tweaking and started RSA key generation!

9. 17 April 2025

Finished RSA Encryption, It was interesting, learned a new thing, modular exponent. Also got the encrypted AES key. 77 length, impressive!

Tried very early stage of RSA Decryption, it is not returning what I wanted though, so more work needed tomorrow!

10. 22 April 2025

Back after 5 days. I tried RSA decryption but faced a lot of problem. The main problem is, I am encrypting RSA Key which is 16 byte, but when decrypting the RSA, it is becoming 32 byte and They do not have anything simillar.

So continued with AES decryption. Starting level is easy, generating keyexpansion again, Managaing the encrypted message as blocks again, and building the inverse functions. We can use encryption functions and just modify it for the inverse function. Symmatric encryption seems more easy than Asymmatric encryption. RSA really gave me a lot of trouble!

Implemented AES Decryption functions, out of 4 3 of them are simple reverse, so they are easy. Problem is with Inv mix column. I didn't use traditional byte function for this, manually modded it. So now I have extra work of finding the inverse of the mod to decrypt it manually! It will take some time I think!

11. 25 April 2025

Worked some more on AES Decryption. Changed the manual Glarious field, went with byte function. But again, Encrypt Message and Decrypt message do not match. Don't know what is the problem, checked every component multiple times and all worked perfectly.

12. 26 April 2025

As the AES Decryption not working correctly, focused on RSA Decryption. All the logic are ok, every component work corrctly but where is the problem? The problem was at the begining and I mean very begining, generating p and q.

So p and q have to be prime, thats the very first condition. Generating 16 byte prime is very hard, it is a very long number, so I asked chatGPT to generate the primes. AI needs more information, I learned today.

So when I asked it to generate, I didnt ask it to check it. So it gave me 3 prime out of 20. So from the beginning it had error. The logic was right but data is wrong, that's what happened.

I asked chatgpt to generate me 20 prime with checking each one, also checked the output to gemini and deepseek(deepseek is not good I think, it said all are not prime!). The main point is, it is returning exact AES key now, all perfect! RSA is officially done.

I should check sboxes which I took from chatgpt 🤔. Maybe the error is there...

13. 28-29 April 2025

Last days of the project, still AES showing error. Everything works right, where is the problem then? Turns out, I called fractionmessage instead of fracUpdMsg, sent string instead of matrix 🙂. That;s why it couldn't decrypt it, naturally!

A big relief for me, I spent a lot of time in this.
