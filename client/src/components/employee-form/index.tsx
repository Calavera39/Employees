import { Employee } from '@prisma/client'
import { Form, Space } from 'antd'
import Card from 'antd/es/card/Card'
import React from 'react'
import { CustomInput } from '../customInput'
import { ErrorMessage } from '../error-message'
import { CustomButton } from '../customBtn'

type Props<T> = {
    onFinish: (values: T) => void
    btnText: string
    title: string
    error?: string
    employee?: T
}

export const EmployeeForm : React.FC<Props<Employee>> = ({
    onFinish,
    title,
    btnText,
    error,
    employee
}) => {
  return (
    <Card title={title} style={{width: '30rem'}}>
        <Form name='employee-form' onFinish={onFinish} initialValues={employee}>
            <CustomInput type='text' name='firstName' placeholder='First Name'/>
            <CustomInput type='text' name='lastName' placeholder='Last Name'/>
            <CustomInput type='number' name='age' placeholder='Age'/>
            <CustomInput type='text' name='address' placeholder='Address'/>
            <Space>
                <ErrorMessage message={error}/>
                <CustomButton htmlType='submit'>
                    {btnText}
                </CustomButton>
            </Space>
        </Form>
    </Card>
  )
}
