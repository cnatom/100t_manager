export default function changePassword(oldPassword,newPassword){
    return new Promise((resolve, reject)=>{
        // 创建一个URL对象
        const url = new URL('http://127.0.0.1:5000/change_password');

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword
            })
        })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
}