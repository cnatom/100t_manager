import {useEffect, useState} from "react";
import {Button, DatePicker, Layout, message, Space, Table, theme} from "antd";
import {useRequest} from "ahooks";
import getRange from "../../service/getRange";
import getData from "../../service/getData";
import {jsonToTableData} from "../../utils/parser";
import {Content} from "antd/lib/layout/layout";
import moment from "moment/moment";
import {Outlet} from "react-router-dom";
import ContentContainer from "./ContentContainer";

function HistoryTemplate({keys = ['scdl', 'scdy'], names = ['输出电流', '输出电压']}) {
    const [tableData, setTableData] = useState({'dataSource': [], 'column': [], 'total': 0});
    const [dateRange, setDateRange] = useState([null, null]);
    const [dataRangeMax, setDataRangeMax] = useState([null, null]);

    // 获取日期范围
    const {run: runGetRange} = useRequest(getRange, {
        manual: true,
        onSuccess: (result) => {
            setDataRangeMax([result['start_time'], result['end_time']]);
            return true;
        }
    });

    // 获取数据
    const {loading: loadingGetData, run: runGetData} = useRequest(getData, {
        manual: true,
        onSuccess: (result) => {
            setTableData(jsonToTableData(result, keys, names));
            return true;
        },
        onError: (error) => {
            return false;
        }
    });

    useEffect(() => {
        runGetData({page: 1});
        runGetRange();
    }, []);


    // 修改Table分页
    const handleTableChange = (pagination, filters, sorter) => {
        runGetData({start_time: dateRange[0], end_time: dateRange[1],page: pagination.current, page_size: pagination.pageSize});
    };

    // 时间选择
    const onChange = (dates, dateStrings) => {
        if (dates === null) return;
        console.log('From: ', dates[0], ', to: ', dates[1]);
        setDateRange(dateStrings);
    };

    // 查询
    const query = () => {
        if (dateRange[0] === null || dateRange[1] === null) {
            message.info('请选择日期范围');
            return;
        }
        runGetData({start_time: dateRange[0], end_time: dateRange[1], page: 1});
    };

    // 重置
    const initData = () => {
        runGetData({page: 1});
        setDateRange([null, null]);
    };

    return (

        <ContentContainer>
            <div>
                {/* 顶部 */}
                <Space direction="horizontal" size={20} style={{margin: '12px'}}>
                    <strong>时间范围</strong>
                    <DatePicker.RangePicker
                        // value={dateRange[0] != null ? [moment(dateRange[0]), moment(dateRange[1])] : null}
                        disabledDate={(current) => {
                            if (dataRangeMax[0] === null || dataRangeMax[1] === null) return false;
                            const start = moment(dataRangeMax[0]).startOf('day');
                            const end = moment(dataRangeMax[1]).endOf('day');
                            return current && (current < start || current > end);
                        }}
                        showTime
                        onChange={onChange}/>
                    <Button type="primary" onClick={query}>查询</Button>
                    <Button onClick={initData}>重置</Button>
                </Space>
                {/* 表格 */}
                <Table
                    dataSource={tableData['dataSource']}
                    columns={tableData['column']}
                    loading={loadingGetData}
                    onChange={handleTableChange}
                    pagination={{
                        position: ['topLeft', 'bottomRight'],
                        total: tableData['total'],
                        pageSize: tableData['page_size'],
                        showSizeChanger: true,
                    }}
                />

            </div>
        </ContentContainer>
    );
}

export default HistoryTemplate;