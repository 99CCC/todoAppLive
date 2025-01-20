import crypto from 'crypto';
import fs from 'fs';

async function cryptPassword(){
    const password = "test";
    const publicKey = fs.readFileSync('public_key.pem', 'utf-8');

    const encryptedPassword = crypto.publicEncrypt(
        {
            key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
        },
    Buffer.from(password));

    const base64EncryptedPassword = encryptedPassword.toString('base64');

    console.log("Encrypted Password: ", base64EncryptedPassword);
}
cryptPassword();