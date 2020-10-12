import { IMAGE_STORAGE_API } from "./api/API";

export function setDataToLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getDataFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}

export const prepareImageSrc = (uri: string) => {
  if (uri.includes("https") || uri.includes("http")) {
    return uri;
  }
  return IMAGE_STORAGE_API + uri;
};
