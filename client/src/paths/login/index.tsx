import React, {useState} from 'react'
import Layout from '../../components/layout'
import Header from '../../components/header'
import {Row, Card, Form, Space, Typography} from 'antd'
import { CustomInput } from '../../components/customInput'
import { PasswordInput } from '../../components/passwordInput'
import { CustomButton } from '../../components/customBtn'
import {Link, useNavigate} from 'react-router-dom'
import { Paths } from '../../paths'
import { UserData, useLoginMutation } from '../../components/app/services/auth'
import { isErrorWithMessage } from '../../utils/isErrorMessage'
import { ErrorMessage } from '../../components/error-message'

const Login = () => {
  const navigate = useNavigate()
  const [loginUser, loginUserResult] = useLoginMutation()
  const [error, setError] = useState('')

  const login = async (data: UserData) => {
   
    try {
      
      await loginUser(data).unwrap()
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
              <Card title='Login' style={{width: '30rem'}}>
                <Form onFinish={login}>
                  <CustomInput type='email' name='email' placeholder='Email'/>
                  <PasswordInput name='password' placeholder='Password'/>
                  <CustomButton type='primary' htmlType='submit'>OK</CustomButton>
                </Form>
                <Space direction='vertical' size='large'>
                  <Typography.Text>
                    No account? <Link to={Paths.register}>Register</Link>
                  </Typography.Text>
                  <ErrorMessage message={error} />
                </Space>
              </Card>
            </Row>
        </Layout>
    </>
  )
}

export default Login