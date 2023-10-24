import React from 'react'
import {Form, Input} from 'antd'

type Props = {
    name?: string | undefined,
    placeholder: string | undefined
    type?: string | undefined
}


export const CustomInput : React.FC<Props> = ({name, placeholder, type}) => {
  return (
    <Form.Item name={name} shouldUpdate={true} rules={[{required: true, message: 'Required input'}]}>
        <Input placeholder={placeholder} type={type} size='large'/>
    </Form.Item>
  )
}
