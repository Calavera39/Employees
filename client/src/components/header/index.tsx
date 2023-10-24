import React from 'react'
import styles from './index.module.css'
import {Layout, Space, Typography, Button} from 'antd'
import { TeamOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { CustomButton } from '../customBtn'
import {Link, useNavigate} from 'react-router-dom'
import { Paths } from '../../paths'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../app/feature/auth/authSlice'

const Header = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const onLogoutClick = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        navigate('/login')
    }



  return (
    <Layout.Header className={styles.header}>
        <Space>
            <TeamOutlined style={{ fontSize: '200%'}} className={styles.teamIcon}/>
            <Link to={Paths.home}>
                <CustomButton type='ghost' > 
                    <Typography.Title level={1}>Employees</Typography.Title>
                </CustomButton>
            </Link>
        </Space>
        {
            user ? (
                <CustomButton onClick={onLogoutClick} icon={<LogoutOutlined />} type='ghost'>Logout</CustomButton>
            ) : 
            <Space>
            <Link to={Paths.register}>
                <CustomButton type='ghost' icon={<UserOutlined />}>Register</CustomButton>
            </Link>

            <Link to={Paths.login}>
                <CustomButton type='ghost' icon={<LoginOutlined />} >Login</CustomButton>
            </Link>
        </Space>
        }


        
    </Layout.Header>
  
  )
}

export default Header