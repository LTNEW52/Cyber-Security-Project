# Cyber-Security-Project

Welcome to our Cyber-Security Project. We, Labib Tahmid, Towhidul Islam and Ashraful are trying our best to implement hybrid cipher, a web based project which uses AES encryption and RSA encryption(For now , We will try for decryption also!). This Readme file will be basically our project log, focusing day to day work and also how it works.

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

11.
