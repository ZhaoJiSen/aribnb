import DB from "@/utils/indexDB";
import languageObjectStore from "./objectStores/languageObjectStore";

const airbnb = new DB("airbnb");

export { airbnb, languageObjectStore };
