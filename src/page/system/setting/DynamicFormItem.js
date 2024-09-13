import React from 'react';
import { Form, Input, Select, Switch, InputNumber } from 'antd';

const { Option } = Select;

const DynamicFormItem = ({ config, data, onDataChange }) => {
    const handleChange = (value) => {
        // 当表单项值发生变化时，调用onDataChange更新外部数据
        onDataChange(config.id, value);
    };

    const renderFormItem = (type) => {
        switch (config.type) {
            case 'enum':
                return (
                    <Select placeholder="请选择" value={data} onChange={handleChange}>
                        {config.values.map(value => (
                            <Option key={value.id} value={value.id}>{value.name}</Option>
                        ))}
                    </Select>
                );

            case 'string':
                return <Input placeholder="请输入" value={data} onChange={e => handleChange(e.target.value)} />;

            case 'bool':
                return <Switch checked={data} onChange={handleChange} />;

            case 'number':
                return <InputNumber placeholder="请输入数字" style={{ width: '100%' }} value={data} onChange={handleChange} />;

            case 'color':
                return <Input type="color" style={{ width: '100%' }} value={data} onChange={e => handleChange(e.target.value)} />;

            default:
                return null; // 当配置类型未知时不渲染任何东西
        }
    };

    return (
        <Form.Item
            label={config.name}
            name={config.id}
        >
            {renderFormItem()}
        </Form.Item>
    );
};

export default DynamicFormItem;