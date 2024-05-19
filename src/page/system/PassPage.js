// 修改密码页面
import {Button, Card, DatePicker, Flex, Form, Input, Layout, message, Space, Table} from "antd";
import {useRequest} from "ahooks";
import changePassword from "../../service/changePassword";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {Content} from "antd/lib/layout/layout";
import ContentContainer from "../template/ContentContainer";

function PassPage() {
    const navigate = useNavigate();
    const {run: runChangePassword} = useRequest(changePassword, {
        manual: true,
        onSuccess: (result, params) => {
            if (result.status === 200) {
                message.success(result.message);
                navigate('/login');

            } else {
                message.error(result.message);
            }
        },
    });
    return (

        <Flex justify={'center'} style={{height:'100%',width:'100%'}}>
            <Card title={"修改密码"} style={{
                minWidth: "40%",
                alignSelf:'center',
            }}>
                <Form
                    name="修改密码"
                    onFinish={(values) => {
                        runChangePassword(values.oldPassword, values.newPassword);
                    }}
                >
                    <Form.Item
                        label="旧密码"
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: '输入旧密码',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="新密码"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: '输入新密码',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>


                    <Form.Item>
                        <Flex justify={'center'}>
                            <Button  type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
}

export default PassPage;