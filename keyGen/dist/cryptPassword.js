"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
async function cryptPassword() {
    const password = "test";
    const publicKey = fs_1.default.readFileSync('public_key.pem', 'utf-8');
    const encryptedPassword = crypto_1.default.publicEncrypt({
        key: publicKey,
        padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    }, Buffer.from(password));
    const base64EncryptedPassword = encryptedPassword.toString('base64');
    console.log("Encrypted Password: ", base64EncryptedPassword);
}
cryptPassword();
