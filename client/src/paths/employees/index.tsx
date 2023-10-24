
import React, {useEffect} from 'react'
import Layout from '../../components/layout'
import { CustomButton } from '../../components/customBtn'
import { PlusCircleOutlined } from '@ant-design/icons'
import Header from '../../components/header'
import { useGetAllEmployeesQuery } from '../../components/app/services/employees'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Employee } from '@prisma/client'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { useSelector } from 'react-redux'
import { selectUser } from '../../components/app/feature/auth/authSlice'



const columns: ColumnsType<Employee> =  [
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
]

export const Employees = () => {
    const navigate = useNavigate()

    const user = useSelector(selectUser)

    const {data, isLoading} = useGetAllEmployeesQuery()
    console.log(data)

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    }, [navigate, user])
    

    const goToAddUser = () => {
        navigate(Paths.employeeAdd)
    }

  return (
   <>
     <Header />
    <Layout>
        <CustomButton onClick={goToAddUser} icon={<PlusCircleOutlined />} type='primary'>Add</CustomButton>
        <Table 
        onRow={(record => {
            return {
                onClick: () => navigate(`${Paths.employee}/${record.id}`)
            }
            
        })}
        
        rowKey={(record) => record.id} columns={columns} loading={isLoading} dataSource={data} pagination={false}/>
        
    </Layout>
   </>
  )
}
