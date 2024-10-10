import {HOST} from "../config";

export default function updateConfig(configData){
    return new Promise((resolve, reject)=>{
        // 创建一个URL对象
        const url = new URL(`http://${HOST}:5000/update_config`);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(configData)
        })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
}