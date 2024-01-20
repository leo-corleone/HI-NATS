import axios from "axios";

export class Api {
    constructor(schema) {
        console.log('schema' , schema)
        this.schema = schema;
    }

    get = async (url, params) => {
        return await axios.request({
            method: "get",
            url,
            params,
        }).then(response => response.data)
            .catch(err => err);
    }

}