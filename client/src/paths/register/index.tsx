import React, {useState} from 'react'
import Layout from '../../components/layout'
import Header from '../../components/header'
import {Row, Card, Form, Space, Typography} from 'antd'
import { CustomInput } from '../../components/customInput'
import { PasswordInput } from '../../components/passwordInput'
import { CustomButton } from '../../components/customBtn'
import {Link, useNavigate} from 'react-router-dom'
import { Paths } from '../../paths'
import { useSelector } from 'react-redux'
import { selectUser } from '../../components/app/feature/auth/authSlice'
import { useRegisterMutation } from '../../components/app/services/auth'
import { User } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/isErrorMessage'
import { ErrorMessage } from '../../components/error-message'

type registerData = Omit<User, 'id'> & {
  confirmPasswod: string
}

const Register = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [error, setError] = useState('')
  const [registeruser] = useRegisterMutation()

  const register =async (data:registerData) => {
    try {
      await registeruser(data).unwrap()
      navigate('/')

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
        <Row align='middle' justify='center'>
          <Card title='Register' style={{width: '30rem'}}>
            <Form onFinish={register}>
              <CustomInput type='name' name='name' placeholder='Name'/>
              <CustomInput type='email' name='email' placeholder='Email'/>
              <PasswordInput name='password' placeholder='Password'/>
              <PasswordInput name='confirmPasswod' placeholder='Repeat password'/>
              <CustomButton type='primary' htmlType='submit'>OK</CustomButton>
            </Form>
            <Space direction='vertical' size='large'>
              <Typography.Text>
                Already have an account? <Link to={Paths.login}>Login</Link>
              </Typography.Text>
              <ErrorMessage message={error}/>
            </Space>
          </Card>
        </Row>
    </Layout>
    </>
  )
}

export default Register