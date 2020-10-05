export function setDataToLocalStorage(key: string, value: string){
    localStorage.setItem(key, value)
}

export function getDataFromLocalStorage(key: string) {
    return localStorage.getItem(key)
}