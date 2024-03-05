export function validateIP(rule, value, callback) {
    if (value === '' || value === undefined || value == null) {
        callback(new Error("IP不能为空"));
    } else {
        const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if ((!reg.test(value)) && value !== '') {
            callback(new Error('请输入正确的IP地址'));
        } else {
            callback();
        }
    }
}

export function validateMonitorIP(rule, value, callback) {
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
        const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if ((!reg.test(value)) && value !== '') {
            callback(new Error('请输入正确的IP地址'));
        } else {
            callback();
        }
    }
}

export function isPort(rule, value, callback) {
    if (!value) {
        return callback(new Error('请输入端口号'));
    }
    setTimeout(() => {
        if (value === '' || typeof (value) === undefined) {
            callback(new Error('请输入端口号'));
        } else {
            const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
            const rsCheck = re.test(value);
            if (!rsCheck) {
                callback(new Error('请输入在[0-65535]之间的端口值'));
            } else {
                callback();
            }
        }
    }, 100);
}

export function isMonitorPort(rule, value, callback) {
    setTimeout(() => {
        if (value === null || value === '' || typeof (value) === undefined) {
            callback();
        } else {
            const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
            const rsCheck = re.test(value);
            if (!rsCheck) {
                callback(new Error('请输入在[0-65535]之间的端口值'));
            } else {
                callback();
            }
        }
    }, 100);
}

export function validateTopic(rule, value, callback){
    if (!value) {
        return callback(new Error('请输入主题'));
    }
    setTimeout(() => {
        if (value === '' || typeof (value) === undefined) {
            callback(new Error('请输入主题'));
        } else {
            if (value === '>'){
                callback(new Error("禁止使用单个通配符'>'订阅"));
            }else {
                callback();
            }
        }
    }, 50);
}


