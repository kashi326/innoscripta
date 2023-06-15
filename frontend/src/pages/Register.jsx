import {Form, Input, Button, Card, Select} from 'antd';
import AppLayout from "../components/Layout";
import useUsersStore from "../stores/users";
import {formatErrors} from "../utils/utils";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";

const RegisterPage = () => {
    const loading = useUsersStore((state) => state.loading);
    const signup = useUsersStore((state) => state.signup);
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const [categoryOptions, setCategoryOptions] = useState([]);

    const categoryOptionsMap = {
        newsapi: ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
        nytimes: [],
        guardian: ["about", "animals-farmed", "artanddesign", "australia-news", "better-business", "books", "business", "business-to-business", "cardiff", "childrens-books-site", "cities"],
    };

    const handleSourceChange = async (value) => {
        const options = categoryOptionsMap[value] || [];
        setCategoryOptions(options);
    };
    const onFinish = async (values) => {
        try {
            await signup(values);
            navigate('/')
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
                        <h2 className="tw-text-2xl tw-font-bold">Register</h2>
                        <p className="tw-text-gray-600">Please fill in the registration form</p>
                    </div>
                    <Form form={form} name="registerForm" onFinish={onFinish} layout={"vertical"}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email address!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your email!',
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
                        <Form.Item
                            name={"preferred_source"}
                            label={"Source"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your source!',
                                }
                            ]}
                        >
                            <Select onChange={handleSourceChange} size={"large"}>
                                <Select.Option value={'newsapi'}>News API</Select.Option>
                                <Select.Option value={'nytimes'}>New York Times</Select.Option>
                                <Select.Option value={'guardian'}>The Gardian</Select.Option>
                            </Select>
                        </Form.Item>
                        {categoryOptions.length > 0 && <Form.Item
                            name="preferred_category"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your category!',
                                },
                            ]}
                            label="Category"
                        >
                            <Select className={"tw-min-w-[100px]"} size={"large"}>
                                {categoryOptions.map((category) => (
                                    <Select.Option key={category} value={category} className={"tw-capitalize"}>
                                        {category}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>}
                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit" className="tw-w-full">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </AppLayout>
    );
};

export default RegisterPage;
