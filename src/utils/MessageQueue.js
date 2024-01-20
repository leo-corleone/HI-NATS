import {connect, JSONCodec, StringCodec} from "nats";


class MessageQueue {
    constructor() {
        this.subCache = new Map();
        this.subscriptions = new Map();
        this.sc = new StringCodec();
        this.codec = new JSONCodec();
        this.nc = null;
    }

    conn = async (config) => {
        this.nc = await connect({
            servers: [`nats://${config.host}:${config.port}`],
            timeout: 3000,
            reconnect: true,
            maxReconnectAttempts: -1,
            pingInterval: 3000,
            name: config.name,
            reconnectTimeWait: 3000,
            waitOnFirstConnect: false,
            noAsyncTraces: true
        },).then(data => data)
            .catch(err => {
                if (config.errorListener) {
                    config.errorListener(err)
                }
            });

        if (this.nc && config.connectionListener) {
            (async () => {
                for await (const s of this.nc.status()) {
                    config.connectionListener(s);
                }
            })().then();
        }
    }

    sub = (topic, fun) => {
        if (!this.subCache.has(topic) && this.nc) {
            this.subCache.set(topic, fun);
            const subscription = this.nc.subscribe(topic,
                {
                    callback: (err, msg) => {
                        const result = fun(this.decode(msg.data));
                        if (msg.reply != null) {
                            msg.respond(this.encode(result))
                        }
                    }
                }
            );
            this.subscriptions.set(topic, subscription);
        }
    };

    unsub = (topic) => {
        if (this.subCache.has(topic) && this.subscriptions.has(topic) && this.nc) {
            this.subscriptions.get(topic)
                .drain()
                .then(() => {
                    this.subCache.delete(topic)
                });
        }
    };

    pub = (topic, data) => {
        if (this.nc) {
            this.nc.publish(topic, this.encode(data))
        }
    }


    req = (topic, data) => {
        if (this.nc) {
            this.nc.request(topic, data, {
                timeout: 10 * 1000,
                noMux: true
            }).then(msg => this.decode(msg.data)
            ).catch(err => err)
        }
    }

    encode = (data) => {
        if (data === null) {
            return '';
        }
        if (typeof data === 'object') {
            return this.codec.encode(data);
        } else {
            return this.sc.encode(data);
        }
    }

    decode = (data) => {
        return data === null ? data : this.sc.decode(data);
    }

    close = async () => {
        if (this.nc) {
            await this.nc.close();
        }
    }
}

export default MessageQueue;
