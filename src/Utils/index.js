export function saveUserData(user) {
    localStorage.setItem("userData", JSON.stringify(user));
}

export function getUserData() {
    const user = localStorage.getItem('userData');
    if(user) {
        return JSON.parse(user);
    } else {
        return null;
    }
}
export function isLoggedInUser() {
    //console.log("Boolean(localStorage.getItem('userData'));", Boolean(localStorage.getItem('userData')))
    return Boolean(localStorage.getItem('userData'));
}

export function clearUserData() {
    localStorage.clear('userData');
}