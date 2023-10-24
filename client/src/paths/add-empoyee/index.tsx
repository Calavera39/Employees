import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout'
import Header from '../../components/header'
import { Row } from 'antd'
import { EmployeeForm } from '../../components/employee-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../components/app/feature/auth/authSlice'
import { useAddEmployeeMutation } from '../../components/app/services/employees'
import { Employee } from '@prisma/client'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/isErrorMessage'

export const AddEmployee = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const [AddEmployee] = useAddEmployeeMutation()


    useEffect(() => {
        if(!user) {
            navigate('/login')
        }


    }, [navigate, user])

    const handleAddEmployee = async (data: Employee) => {
        try {
            await AddEmployee(data).unwrap()
            navigate(`${Paths.status}/created`)
        } catch (err) {
            const maybeError = isErrorWithMessage(err)

            if(maybeError) {
                setError(err.data.message)
            } else {
                setError('Unknown Error')
            }
        }
    }



  return (
    <>
        <Header />
        <Layout>
            <Row align='middle' justify='center'>
                <EmployeeForm title='Add Employee' btnText='Add' onFinish={handleAddEmployee} error={error}/>
            </Row>
        </Layout>
    </>
  )
}
