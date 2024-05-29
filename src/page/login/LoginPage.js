import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginFormPage, ProConfigProvider, ProFormText,} from '@ant-design/pro-components';
import {Button, Form, Input, message, Modal, theme} from 'antd';
import {useState} from "react";
import {useRequest} from "ahooks";
import login from "../../service/login";
import {useNavigate} from "react-router-dom";


const LoginPage = () => {
    const {token} = theme.useToken();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const {run:runLogin} = useRequest(login,{
        manual: true,
        onSuccess: (result) => {
            console.log(result);
            if (result.status === 200){
                message.success('登录成功');
                navigate('/admin');
            }else{
                message.error('登录失败，请检查账号或密码');
            }
        }
    });


    const handleChangePassword = async (values) => {
        const { oldPassword, newPassword } = values;
        console.log(oldPassword, newPassword);
    };


    return (<ProConfigProvider dark>
        <div
            style={{
                backgroundColor: 'white', height: '100vh',
            }}
        >
            <LoginFormPage
                backgroundVideoUrl="/videos/backVideo.mp4"
                title={<div style={{fontSize: '24px'}}>东菱振动试验仪器有限公司</div>}
                containerStyle={{
                    backgroundColor: 'rgba(0, 0, 0,0.65)', backdropFilter: 'blur(4px)',
                }}
                subTitle="大型电动振动台运维平台管理系统"
                onFinish={async (values) => {
                    await runLogin(values.username, values.password);
                }}
            >
                <ProFormText
                    name="username"
                    fieldProps={{
                        size: 'large', prefix: (<UserOutlined
                            style={{
                                color: token.colorText,
                            }}
                            className={'prefixIcon'}
                        />),
                    }}
                    placeholder={'用户名（默认用户名:admin）'}
                    rules={[{
                        required: true, message: '请输入用户名!',
                    },]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large', prefix: (<LockOutlined
                            style={{
                                color: token.colorText,
                            }}
                            className={'prefixIcon'}
                        />),
                    }}
                    placeholder={'密码（默认密码:admin)'}
                    rules={[{
                        required: true, message: '请输入密码！',
                    },]}
                />

                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    {/*<ProFormCheckbox noStyle name="autoLogin">*/}
                    {/*    自动登录*/}
                    {/*</ProFormCheckbox>*/}
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        style={{
                            float: 'right',
                        }}
                        onClick={() => setIsModalVisible(true)}
                    >
                        修改密码
                    </a>
                </div>
            </LoginFormPage>
            <Modal title="修改密码" open={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
                <Form
                    name="changePassword"
                    initialValues={{remember: true}}
                    onFinish={handleChangePassword}
                >
                    <Form.Item
                        label="旧密码"
                        name="oldPassword"
                        rules={[{required: true, message: '请输入旧密码!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="新密码"
                        name="newPassword"
                        rules={[{required: true, message: '请输入新密码!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    </ProConfigProvider>);
};


export default LoginPage;
