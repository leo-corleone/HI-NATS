import {ErrorCode} from "nats.ws";

const errorMap = new Map();

for (let key in ErrorCode) {
    if (!errorMap.has(ErrorCode[key])){
        errorMap.set(ErrorCode[key] , key);
    }
}

console.log(errorMap);