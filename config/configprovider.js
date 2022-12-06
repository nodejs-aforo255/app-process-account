const NacosConfigClient = require('nacos').NacosConfigClient
const express = require('express')
const app = express()

exports.appPromise = new Promise( async function(resolve, reject) {
        const configClient = new NacosConfigClient({
            serverAddr: process.env.NACOS_SERVERADDR,
            namespace: process.env.NACOS_NAMESPACE,
            identityKey: process.env.NACOS_IDENTITYKEY,
            identityValue: process.env.NACOS_IDENTITYVALUE
        })
        const content = await configClient.getConfig(process.env.NACOS_ENV, 'DEFAULT_GROUP');
        const jsonData = JSON.parse(content.toString());
        console.log(jsonData)
        for(let item in jsonData){
            process.env[item.toUpperCase()] = jsonData[item]
        }
        app.use(express.json())
        resolve(app);
})
