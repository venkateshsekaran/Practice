const crypto = require('crypto')

const jwt = {
    secret: "0ncx56KvPa4_fQxuSdJZm933TKvjVnNmcI00RHqSEXJa4qlpbrStAZKxD2QXEF9nrIqiyAMgw6pmKeFEwbAHQA==",
    session: false
}

module.exports = jwt

    //secret : crypto.randomBytes(64).toString('base64').replace(/\//g,'_').replace(/\/+/g,'_'),  