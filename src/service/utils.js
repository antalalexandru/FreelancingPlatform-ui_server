export function formatDateTime(timeStamp) {
    const date = new Date(timeStamp);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`
}

export function isLoggedIn() {
    return localStorage.username !== undefined;
}

export function getLoggedInUserInfo() {
    return {
        id: localStorage.userId,
        username: localStorage.username,
        roles: localStorage.roles
    }
}