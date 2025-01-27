import axios from "axios";

export async function authController(username: string, password: string){
    try {
        const url = process.env.REACT_APP_AUTH_URL
        const body = {
            username: username,
            password: password
        }

        const res = await axios.post(url!,body);
        return res.data.token;
    } catch (error) {
        console.error(error);
    }
}