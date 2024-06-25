import {Tag} from "antd";
import {keyMap} from "./keyMap";
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
    // 添加tag
    column.push({
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (_, { status }) => (
            <>
                {status.map((tag) => {
                    if (tag === '正常') {
                        return (
                            <Tag color="green" key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    }else if(tag.includes('低')) {
                        return (
                            <Tag color="blue" key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    }else{
                        return (
                            <Tag color="red" key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    }
                })}
            </>
        ),
    });
    column.push({
        title: '时间',
        dataIndex: 'update_time',
        key: 'update_time',
        align: 'center',
    });
    const alarm_rules = jsonList['alarm_rules'];
    for (const json of jsonList['data_history']) {
        let dataChild = {};
        const update_time = json.update_time;
        const data = json.data;
        dataChild['status'] = ['正常'];
        for (const key of keys) {
            dataChild[key] = data[key];
            if(key === 'sn'){
                dataChild['status'] = [data[key] === 1 ? '启动' : '关闭'];
            }else if (key === 'gzbj'){
                dataChild['status'] = [data[key] === 1 ? '异常' : '正常'];
            }else if ((alarm_rules[key][0] !== null && data[key] < alarm_rules[key][0])||(alarm_rules[key][1] !== null && data[key] > alarm_rules[key][1])) {
                if(dataChild['status'][0] === '正常'){
                    dataChild['status'] = [];
                }
                if(data[key] < alarm_rules[key][0]){
                    dataChild['status'].push(`${keyMap[key]} 过低`);
                }else{
                    dataChild['status'].push(`${keyMap[key]} 过高`);
                }
            }

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