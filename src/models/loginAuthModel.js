

//Token may be used for future authentications but we probably won't need it for this project
//As we are only requiring auth for login itself and should not require anymore auths
export function decodeJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
}

