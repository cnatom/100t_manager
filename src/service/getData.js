export default function getData({start_time, end_time, page, page_size}){
    return new Promise((resolve, reject)=>{
        // 创建一个URL对象
        const url = new URL('http://127.0.0.1:5000/get_data');

        // 创建一个URLSearchParams对象
        const params = {}
        if(start_time) params['start_time'] = start_time;
        if(end_time) params['end_time'] = end_time;
        if(page_size) params['page_size'] = page_size;
        params['page'] = page??1;

        // 将URLSearchParams对象设置为URL的查询字符串
        url.search = new URLSearchParams(params);

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