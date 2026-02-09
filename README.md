# LabExam1_Abdulrahman

How encryption and decryption works?

Encryption shifts each letter forward by a fixed key N across the alphabet: 
E=(X+N)  26
E=(X+N)mod26, where 
X
X is the letter index (0–25).
Decryption reverses the process by shifting backward: 
D=(X−N)  26
D=(X−N)mod26, restoring original letter positions.
Only letters A–Z are shifted (case preserved); numbers, spaces, and symbols remain unchanged.
For example with 
N=3
N=3, "ALICE | 1ST YEAR | BSIT" → "DOLFH | 1ST YEAR | EVLW".
