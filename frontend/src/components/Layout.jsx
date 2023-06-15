import { Layout as AntdLayout } from 'antd';
const { Header, Content } = AntdLayout;
function AppLayout({children}) {
    return (
        <AntdLayout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff' }}>
                <h1 style={{ textAlign: 'center' }}>My App</h1>
            </Header>
            <Content style={{ padding: '0 50px'}}>
                {children}
            </Content>
        </AntdLayout>
    );
}

export default AppLayout;