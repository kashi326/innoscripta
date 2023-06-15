import {useCallback, useEffect, useState} from 'react';
import useArticleStore from "../stores/articles";
import {Card, Col, Form, Input, Row, Select, Skeleton} from "antd";
import AppLayout from "../components/Layout";
import useUsersStore from "../stores/users";

const ArticlesList = () => {
    const articles = useArticleStore((state) => state.articles);
    const fetchAllArticles = useArticleStore((state) => state.fetchAllArticles);
    const loading = useArticleStore((state) => state.loading);
    const currentUser = useUsersStore((state) => state.currentUser)
    const [form] = Form.useForm()

    const categoryOptionsMap = {
        newsapi: ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
        nytimes: [],
        guardian: ["about", "animals-farmed", "artanddesign", "australia-news", "better-business", "books", "business", "business-to-business", "cardiff", "childrens-books-site", "cities"],
    };
    const [categoryOptions, setCategoryOptions] = useState(categoryOptionsMap[currentUser.preferences?.source]||[]);

    const handleSourceChange = async (value) => {
        const options = categoryOptionsMap[value] || [];
        form.setFieldsValue({category: undefined}); // Reset category value
        setCategoryOptions(options);
    };

    const fetchAll = useCallback(() => {
        fetchAllArticles()
    }, [fetchAllArticles]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const renderBlogs = () => {
        if (articles.length === 0) {
            return (
                <div className="no-articles">
                    <i className="mdi mdi-alert-circle-outline"></i>
                    <p>No articles found.</p>
                </div>
            );
        }

        return (
            <Row gutter={[24, 24]}>
                {articles.map((article) => {
                    return (
                        <Col sm={24} md={12} lg={8} xl={6} key={article.title}>
                            <Card
                                hoverable
                                cover={article.image?<img alt="" className={'tw-object-cover tw-w-[240px] tw-h-[240px]'}
                                            src={ article.image}/>:null}
                            >
                                <Card.Meta title={article.title} description={article.description?.slice(0, 100)}/>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        );
    };
    const handleChange = async (e,values) => {
        if (e.source){
            values.category = undefined;
        }
        await fetchAllArticles(values)
    }
    return (
        <AppLayout>
            <Form
                form={form}
                layout={"vertical"}
                onValuesChange={handleChange}
                initialValues={{
                    "source":currentUser.preferences?.source,
                    "category":currentUser.preferences?.category,
                }}
            >
                <div className="tw-flex tw-justify-end tw-py-4">
                    <Form.Item name={"source"} label={"Source"} className={"tw-mx-3"}>
                        <Select onChange={handleSourceChange} size={"large"}>
                            <Select.Option value={'newsapi'}>News API</Select.Option>
                            <Select.Option value={'nytimes'}>New York Times</Select.Option>
                            <Select.Option value={'guardian'}>The Gardian</Select.Option>
                        </Select>
                    </Form.Item>
                    {categoryOptions.length > 0 && <Form.Item name="category" className={"tw-mx-3"} label="Category">
                        <Select className={"tw-min-w-[100px]"} size={"large"} >
                            {categoryOptions.map((category) => (
                                <Select.Option key={category} value={category} className={"tw-capitalize"}>
                                    {category?.replaceAll('-',' ')}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>}
                    <Form.Item name={"search"} label={"Search"}>
                        <Input/>
                    </Form.Item>
                </div>
            </Form>
            {loading ? <Skeleton/> : renderBlogs()}
        </AppLayout>
    );
};

export default ArticlesList;
