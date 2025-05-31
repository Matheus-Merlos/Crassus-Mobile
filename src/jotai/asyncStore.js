import { asyncStorage as storage } from "./storage";
import { atomWithStorage } from "jotai/utils";

const isLoggedInAtom = atomWithStorage("is_logged_in", false, storage);
const idAtom = atomWithStorage("id", null, storage);
const nameAtom = atomWithStorage("name", null, storage);
const emailAtom = atomWithStorage("email", null, storage);
const tokenAtom = atomWithStorage("token", null, storage);

export { isLoggedInAtom, idAtom, nameAtom, emailAtom, tokenAtom };
