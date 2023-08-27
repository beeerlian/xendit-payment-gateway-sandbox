import nanoid from "nanoid";

export const randomString = (length: number, customCharacter?: string) => {
  const character =
    customCharacter ??
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-";
  const nanoId = nanoid.customAlphabet(character, 10);
  return nanoId(length);
};
