import { Menu,Badge } from 'antd'
import './Header.css'
import React, { useState } from 'react'
import {ShoppingCartOutlined,ShoppingOutlined, HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';


const { SubMenu } = Menu;//menu.submenu




const Header = () => {
    const [current, setCurrent] = useState('')
    let dispach = useDispatch()
    let { user,cart } = useSelector((state) => ({ ...state }))
    let history = useHistory()
    const handleClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key)
    }

    const logout = () => {
        firebase.auth().signOut()
        dispach({
            type: "LOGOUT",
            payload: null
        });
        history.push('/login')
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>

            </Menu.Item>

            <Menu.Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>

            </Menu.Item>

            <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9,1]}>
                        Cart
                    </Badge>
                </Link>
            </Menu.Item>

            {!user && (
                <Menu.Item key="register" icon={<UserAddOutlined />} className="float-nav">
                    <Link to="/register">Register</Link>
                </Menu.Item>
            )}
            {!user && (
                <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>

                </Menu.Item>
            )}


            {
                user && (
                    <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email&&user.email.split('@')[0]} className="float-right">

                        {user&&user.role==='subscriber'&& <Menu.Item key="subscriber"><Link to="/user/history">Dashboard</Link></Menu.Item>}
                        {user&&user.role==='admin'&& <Menu.Item key="admin"><Link to="/admin/dashboard">Admin Dashboard</Link></Menu.Item>}
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                        <Menu.Item icon={<LogoutOutlined />} onClick={logout}>Logout</Menu.Item>

                    </SubMenu>
                )
            }
            <span className="float-right p-1">
                <Search/>
            </span>
        </Menu>

    )
}

export default Header
