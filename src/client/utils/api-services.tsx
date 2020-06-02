export let Token: string = localStorage.getItem('token') || null;

export const setStorage = (token:string, role: string) => {
    Token = token;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
}

export const logout = () => {
    Token = null;
    localStorage.clear();
}

export default async (uri: string, method: string = 'GET', body?: {}) => {
    const headers: IHeaders  = {
        'Content-Type': 'application/json'
    };

    if (Token) {
        headers['Authorization'] = `Bearer ${Token}`;
    }

    try {

        const res = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });

        if (res.ok) {
            return await res.json();
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        // return 'Server Error Contact Your System Admin'
        throw error;
        
    }

}

export interface IHeaders {
    [key: string]: string;
}