import React from 'react'
import {Form, Input} from 'antd'
import {NamePath} from 'antd/es/form/interface'



type Props = {
    name: string,
    placeholder: string,
    dependencies?: NamePath[]
}

export const PasswordInput : React.FC<Props> = ({name, placeholder, dependencies}) => {
    return (
        <Form.Item name={name} dependencies={dependencies} hasFeedback={true} rules={[{required: true, message:'Required input',}, ({getFieldValue}) => ({
            validator(_, value) {
                if(!value) {
                    return Promise.resolve()
                }

                if(name === 'confirmPasswod') {
                    if(!value || getFieldValue(('password')) === value) {
                        return Promise.resolve()
                    }

                    return Promise.reject(new Error('Passwords must be equal'))
                } else {
                    if(value.length < 6) {
                        return Promise.reject(new Error('Password must be 6 or more'))
                    }
                    return Promise.resolve()
                }
            }
        })]}>
            <Input.Password placeholder={placeholder} size='large'></Input.Password>
        </Form.Item>
    )
}