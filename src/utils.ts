import { IMAGE_STORAGE_API } from './api/APIs';

export const preparedImageSrc = (uri: string | undefined) => {
  if (!uri) return undefined;
  if (uri.includes("https") || uri.includes("http")) {
    return uri;
  }
  return IMAGE_STORAGE_API + uri;
};
