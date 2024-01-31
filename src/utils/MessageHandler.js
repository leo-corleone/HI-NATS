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
            timeout: 1000,
            reconnect: true,
            maxReconnectAttempts: -1,
            pingInterval: 3000,
            name: config.name,
            reconnectTimeWait: 3000,
            waitOnFirstConnect: false,
            noAsyncTraces: true,
            token: config.token,
            user: config.username,
            pass: config.password,
            noEcho: config.noEcho,
         }).then(data => data)
           .catch(err => {
               if (config.errorListener){
                   config.errorListener && config.errorListener(err)
               }else {
                   return err;
               }
           });
        if (this.nc instanceof Error){
            let err = this.nc;
            this.nc = null
            return err;
        }
        if (config.connectionListener) {
            (async () => {
                for await (const s of this.nc.status()) {
                    config.connectionListener(s);
                }
            })().then();
        }
        return this.nc;
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


    req = async (topic, data) => {
        if (this.nc) {
           return await this.nc.request(topic, this.encode(data), {
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
        if (this.isActive()) {
           return  await this.nc.drain();
        }
    }

    isActive = () => {
       return this.nc ? !this.nc.isClosed() : false;
    }
}

const mq = new MessageQueue();
await mq.conn({
    host: '192.168.1.52',
    port: 4322
})

mq.sub('$publish.$data.wjzq.v1.alarm.alarmInfo.>' ,(data) => {
    console.log('sub' , data)
})

mq.sub('$publish.$data.wjzq.v1.platform.alarm.openMonitor' ,(data) => {
    console.log('sub' , data)
})


const re = await mq.req('$report.$data.wjzq.v1.alarm.alarmInfo' , {
   "serialNo":"baaea36c-2481-11ee-8c16-0b3126bb0cf2",
    "handlerId":1,
    "soldierId":1,
    "status":"unconfirmed",
    "alarmType":"detonationPrison"
})
console.log(re)