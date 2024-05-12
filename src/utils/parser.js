export function jsonToTableData(jsonList, keys, names) {
    const dataSource = [];
    const column = [];

    for (let i = 0; i < keys.length; i++) {
        column.push({
            title: names[i],
            dataIndex: keys[i],
            key: keys[i],
            align: 'center',
        });
    }
    column.push({
        title: '时间',
        dataIndex: 'update_time',
        key: 'update_time',
        align: 'center',
    });
    for (const json of jsonList['data_history']) {
        let dataChild = {};
        const update_time = json.update_time;
        const data = json.data;
        for (const key of keys) {
            dataChild[key] = data[key];
        }
        dataChild['update_time'] = update_time;
        dataSource.push(dataChild);
    }
    return {
        'dataSource': dataSource,
        'column': column,
        'total': jsonList.total,
    };
}

// console.log(jsonToTableData(data,['scdl','scdy'],['输出电流','输出电压']));