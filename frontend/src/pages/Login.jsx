import {Button, Card, Form, Input} from 'antd';
import AppLayout from "../components/Layout";
import useUsersStore from "../stores/users";
import {formatErrors} from "../utils/utils";
import {Link, useNavigate} from "react-router-dom";

const LoginPage = () => {

    const loading = useUsersStore((state) => state.loading);
    const login = useUsersStore((state) => state.login);
    const [form] = Form.useForm()
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            await login(values);
           window.location.href = '/'
        } catch (error) {
            const {errors} = error.response.data
            form.setFields(formatErrors(errors))
        }
    };
    return (
        <AppLayout>
            <div className="tw-flex tw-justify-center tw-items-center tw-h-screen">
                <Card className="w-100 tw-w-full tw-max-w-md">
                    <div className="tw-text-center tw-mb-4">
                        <h2 className="tw-text-2xl tw-font-bold">Login</h2>
                        <p className="tw-text-gray-600">Please enter your credentials</p>
                    </div>
                    <Form form={form} name="loginForm" layout={"vertical"} initialValues={{remember: true}}
                          onFinish={onFinish}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email address!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit" className="tw-w-full">
                                Log in
                            </Button>
                        </Form.Item>
                        <div className="tw-flex tw-justify-end">
                            <Link to={'/register'}>Register</Link>
                        </div>
                    </Form>
                </Card>
            </div>
        </AppLayout>
    );
};

export default LoginPage;
