import axios from "axios";
export class Api {
    constructor(prefix , schema) {
        this.prefix = prefix;
        this.schema = schema;
    }

    get = async (uri, params) => {
        return await axios.request({
            method: "get",
            url: `${this.prefix}://${this.schema}${uri}`,
            params,
            timeout: 10 * 1000
        }).then(response => response.data)
            .catch(err => err);
    }

    post = async (uri, params) => {
        return await axios.request({
            method: "post",
            url: `${this.prefix}://${this.schema}${uri}`,
            params,
            timeout: 10 * 1000
        }).then(response => response.data)
            .catch(err => err);
    }

    queryGeneral = async () => {
        return await this.get("/varz")
    }

    queryConnections = async () => {
        return await this.get("/connz")
    }

    queryHealthProbe = async () => {
        return await this.get("/healthz")
    }
}


const api = new Api("http" ,'110.41.3.32:822')
console.log(await api.queryGeneral());
console.log(await api.queryConnections());
console.log(await api.queryHealthProbe());