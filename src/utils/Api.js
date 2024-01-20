import axios from "axios";

export class Api {
    constructor(scheme) {
        this.scheme = scheme;
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