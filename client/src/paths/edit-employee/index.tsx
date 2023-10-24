import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../components/app/services/employees'
import Header from '../../components/header'
import Layout from '../../components/layout'
import { Row } from 'antd'
import { EmployeeForm } from '../../components/employee-form'
import { Employee } from '@prisma/client'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/isErrorMessage'

export const EmployeeEdit = () => {
    const navigate = useNavigate()
    const params = useParams<{id:string}>()
    const [error, setError] = useState('')
    const {data, isLoading} = useGetEmployeeQuery(params.id || '')
    const [editEmployee] = useEditEmployeeMutation()


    const handleEditUser =async (employee: Employee) => {
        try {
            const editedEmployee = {
                ...data,
                ...employee
            }

        await editEmployee(editedEmployee).unwrap()
        navigate(`${Paths.status}/updated`)
        } catch (err) {
            const maybeError = isErrorWithMessage(err) 
            if(maybeError) {
                setError(err.data.message)
            } else {
                setError('Unknown error')
            }
        }
    }

    if(isLoading) {
        return <span>Loading...</span>
    }

  return (
    <>
    <Header />
    <Layout>
        <Row align='middle' justify='center'>
            <EmployeeForm title='Edit employee' btnText='Edit' error={error} employee={data} onFinish={handleEditUser}/>
        </Row>
    </Layout>
    </>
  )
}
