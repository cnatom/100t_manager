import {HOST} from "../config";

export default function updateAlarmRules(key, min,max){
    return new Promise((resolve, reject)=>{
        // 创建一个URL对象
        const url = new URL(`http://${HOST}:5000/update_alarm_rules`);
        let body = {};
        body[key] = [min,max];
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
}