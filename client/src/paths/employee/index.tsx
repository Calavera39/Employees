import React, {useState} from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../components/app/services/employees'
import { useSelector } from 'react-redux'
import { selectUser } from '../../components/app/feature/auth/authSlice'
import Header from '../../components/header'

import { Descriptions, Divider, Modal, Space } from 'antd'
import Layout from '../../components/layout'
import { CustomButton } from '../../components/customBtn'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ErrorMessage } from '../../components/error-message'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/isErrorMessage'

export const Employee = () => {


    const navigate = useNavigate()
    const params = useParams<{id: string}>()
    const [error, setError] = useState('')
    const [isModalopen, setIsModalOpen] = useState(false)
    const {data, isLoading} = useGetEmployeeQuery(params.id || '')
    const [removeEmployee] = useRemoveEmployeeMutation()
    const user = useSelector(selectUser)


    if(isLoading) {
        return <span>Loading...</span>
    }

    if(!data) {
        return <Navigate to='/'/>
    }

    const hideModal = () => {
        setIsModalOpen(false)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handlDeleteUser = async () => {
        hideModal()

        try {
            await removeEmployee(data.id).unwrap()

            navigate(`${Paths.status}/deleted`)
        } catch (err) {
            const maybeError = isErrorWithMessage(err)
            if(maybeError) {
                setError(err.data.message)

            } else {
                setError('Unknown error')
            }
        }
    }

  return (
    <>
    <Header />
    <Layout>
        <Descriptions title='Info about Employee' bordered={true}>
            <Descriptions.Item label='Name' span={3}>
                {`${data.firstName} ${data.lastName}`}
            </Descriptions.Item>
            <Descriptions.Item label='Age' span={3}>
                {`${data.age}`}
            </Descriptions.Item>
            <Descriptions.Item label='Address' span={3}>
                {`${data.address}`}
            </Descriptions.Item>
        </Descriptions>
        {
            user?.id === data.userId && (
                <>
                <Divider orientation='left'>
                    Actions
                </Divider>
                <Space>
                    <Link to={`/employee/edit/${data.id}`}>
                        <CustomButton shape='round' type='default' icon={<EditOutlined />}>Edit</CustomButton>
                    </Link>
                        <CustomButton shape='round' danger onClick={showModal} icon={<DeleteOutlined />}>Delete</CustomButton>
                </Space>
                
                </>
            )
        }

        <ErrorMessage message={error}/>
        <Modal title='Confirm deletion' open={isModalopen} onOk={handlDeleteUser} onCancel={hideModal} okText='Confirm' cancelText='Cancel'>
            You are going to delete an Employee from table
        </Modal>
    </Layout>
    </>
  )
}
