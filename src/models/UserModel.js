/**
 * The UserModel helps set up the localStorage function as well as add more fields whenever necessary (e.g. Students need an extra field for student ID)
 * @type {string}
 */


const USER_KEY = "user";

/**
 * Save user with any new information
 * @param user
 */
export const saveUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Retrieve user from localStorage
 * @returns {any|null}
 */
export const getUser = () => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
};

/**
 * Remove from localStorage (logging out)
 */
export const clearUser = () => {
    localStorage.removeItem(USER_KEY);
};

/**
 * Add extra fields
 * @param key - key wish to add
 * @param value - value wanted to add
 */
export const addMoreFields = (key,value) => {
    const user = getUser();
    if (user){
        user[key] = value;
            saveUser(user);
    }
}