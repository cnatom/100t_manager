export default function getAlarmRules(){
    return new Promise((resolve, reject)=>{
        // 创建一个URL对象
        const url = new URL('http://127.0.0.1:5000/get_alarm_rules');

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
}