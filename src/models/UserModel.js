const USER_KEY = "user";

export const saveUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
};

export const clearUser = () => {
    localStorage.removeItem(USER_KEY);
};

export const addMoreFields = (key,value) => {
    const user = getUser();
    if (user){
        user[key] = value;
            saveUser(user);
    }
}