import {AtomlessObject} from "./types";
import {Parser} from 'xml2js';

const removeAtom = (obj: AtomlessObject) => {
    const newObj: AtomlessObject = {};
    for (const key in obj) {
        const newKey = key.startsWith('atom:') ? key.substring(5) : key;

        if (Array.isArray(obj[key])) {
            newObj[newKey] = (obj[key] as AtomlessObject[]).map((item) => removeAtom(item));
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            newObj[newKey] = removeAtom(obj[key] as AtomlessObject);
        } else {
            newObj[newKey] = obj[key];
        }
    }
    return newObj;
}
const removeAtomPrefix = (arr: AtomlessObject[] | AtomlessObject): any => {
    if(Array.isArray(arr)){
        return arr?.map(obj => removeAtom(obj))
    }else {
        return removeAtom(arr)
    }
};

const xmlParser = async (xmlData: string): Promise<AtomlessObject[]> => {
    const parser = new Parser({ explicitArray: false, mergeAttrs: true });
    try {
        const result = await new Promise<any>((resolve, reject) => {
            parser.parseString(xmlData, (err: any, result: any) => {
                if (err) {
                    console.error('Error at parsing XML:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        if(result["atom:entry"]){
            return [removeAtomPrefix(result["atom:entry"]).content]
        }else{
            return removeAtomPrefix(result["atom:feed"]["atom:entry"])
        }
    } catch (error) {
        console.error('Chyba:', error);
        throw error;
    }
};

export default xmlParser
