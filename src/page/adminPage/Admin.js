import { Layout, Menu } from 'antd';
import { Link, useLocation } from "react-router-dom";
import Users from './Users';

const { Header, Content, Sider } = Layout;

const Admin = () => {
    const location = useLocation();


    return (
        <Layout className="admin-layout">
            <Sider className="admin-sider">
                <Menu mode="vertical" selectedKeys={[location.pathname]}>
                    <Menu.Item key="/public-image">
                        <Link to="/public-image" className="menu-link">Public image</Link>
                    </Menu.Item>
                    <Menu.Item key="/main">
                        <Link to="/main" className="menu-link">Home</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content className="admin-content">
                    <Users />
                </Content>
            </Layout>
        </Layout>

    )
}

export default Admin
