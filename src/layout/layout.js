import React, {useEffect, useState} from "react"
import {Layout, Menu} from "antd"
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';

import "./layout.css"
import {MemeCard} from "../components"
import {getAllMemes} from "../services/memes"

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Files', '9', <FileOutlined />),
];

export const LayoutSite = () => {
    const [memes, setMemes] = useState()
    const [next, setNext] = useState()
    const [back, setBack] = useState( null)
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        (async() => {
            const data = await getAllMemes()
            if(data.code === 200){
                setMemes(data.data)
                setNext(data.next? data.next : null)
            }
        })()
    }, [])

    const getNextMemes = async(nextURL) => {
        const data = await getAllMemes(nextURL)
        if(data.code === 200){
            setMemes(data.data)
            setNext(data.next? data.next : null)
            setBack(nextURL)
        }
    }

    const handleSearch = (value) => {
        const data = memes.filter(meme => meme.name.toLowerCase().includes(value.toLowerCase()))
        setMemes(data.data)
    }

    return(
        <Layout className="site-layout">
            <Sider className="header" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <h1 className="header-text logo">All Memes</h1>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Content
            className="site-layout-background site-content"
            >
                {/* <Routes>
                    <Route
                    path="/"
                    element={<Home mode={mode} showAlert={showAlert} alerts={alerts} />}
                    />
                    <Route path="/about" element={<About />}/>
                </Routes> */}
                <input placeholder="enter keyword" onChange={(event)=> handleSearch(event.target.value)}/>
                <p className="content-header">Latest Memes</p>
                <MemeCard getNextMemes={getNextMemes} memes={memes} next={next} back={back}/>
            </Content>
            <Footer
            className="footer"
            >
            All rights reseverd ©2022 Created by Ayesha
            </Footer>
        </Layout>
    )
}