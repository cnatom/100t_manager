import React, {useEffect, useState} from 'react';
import {Button, Collapse, Form, Input, InputNumber, Select, Switch} from 'antd';


function renderFormItem(key, value, template, handleChange) {
    // 通过key在template中查找type
    let type = '';
    let name = '';
    let chart;
    const values = [];
    for (const config of template.config) {
        if (key === config.id) {
            name = config.name;
            type = config.type;
            if (type === 'enum') {
                values.push(...config.values);
            }
        }
    }
    switch (type) {
        case 'enum':
            chart = (
                <Select placeholder="请选择" value={value} onChange={handleChange}>
                    {values.map(value => (
                        <Select key={value.id} value={value.id}>{value.name}</Select>
                    ))}
                </Select>
            );
            break;
        case 'string':
            chart = <Input placeholder="请输入" value={value} onChange={e => handleChange(e.target.value)}/>;
            break;
        case 'bool':
            chart = <Switch checked={value} onChange={handleChange}/>;
            break;
        case 'number':
            chart =
                <InputNumber placeholder="请输入数字" style={{width: '100%'}} value={value} onChange={handleChange}/>;
            break;
        case 'color':
            chart = <Input type="color" style={{width: '100px', height: '50px'}} value={value}
                           onChange={e => handleChange(e.target.value)}/>;
            break;
        default:
            return null; // 当配置类型未知时不渲染任何东西
    }
    return <Form.Item label={name}>
        {chart}
    </Form.Item>;
};

const SettingsForm = ({initialChartData, onSave, template}) => {
    const [formData, setFormData] = useState(initialChartData);
    const handleInputChange = (value, key, index) => {
        setFormData(prevFormData => {
            if (typeof index === 'number') {
                const newItems = [...prevFormData.items];
                newItems[index][key] = value;
                return {...prevFormData, items: newItems};
            }
            if (typeof index === 'string') {
                const newConfig = {...prevFormData.config};
                newConfig[index] = value;
                return {...prevFormData, config: newConfig};
            }
            return {...prevFormData, [key]: value};
        });
    };

    useEffect(() => {
        setFormData(initialChartData);
    }, [initialChartData]);

    return (
        <Form
            layout="vertical"
            onFinish={() => onSave(formData)}
        >
            <Form.Item label="图表标题">
                <Input
                    value={formData.title}
                    onChange={e => handleInputChange(e.target.value, 'title')}
                />
            </Form.Item>
            {Object.entries(formData.config).map(([key, value]) => {
                return renderFormItem(key, value, template, (value) => {
                    handleInputChange(value, 'config', key);
                });
            })}
            <Collapse accordion>
                {formData.items.map((item, index) => {
                    console.log(item);
                    return (
                        <Collapse.Panel header={`Item ${index + 1}: ${item.name}`} key={item.id}>
                            <Form.Item label="标题">
                                <Input
                                    value={item.name}
                                    onChange={e => handleInputChange(e.target.value, 'name', index)}
                                />
                            </Form.Item>
                            <Form.Item label="显示" valuePropName="checked">
                                <Switch
                                    checked={item.visible}
                                    onChange={checked => handleInputChange(checked, 'visible', index)}
                                />
                            </Form.Item>
                            {item.unit ? <Form.Item label="标题">
                                <Input
                                    value={item.unit}
                                    onChange={e => handleInputChange(e.target.value, 'unit', index)}
                                />
                            </Form.Item> : null}
                        </Collapse.Panel>
                    );
                })}
            </Collapse>
            <Form.Item style={{
                marginTop: 20
            }}>
                <Button type="primary" htmlType="submit">
                    保存配置
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SettingsForm;