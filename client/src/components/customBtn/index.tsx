import React from 'react'
import {Button, Form} from 'antd'

type Props = {
    children: React.ReactNode;
    htmlType?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined;
    danger?: boolean;
    loading?: boolean;
    shape?: "default" | "circle" | "round" | undefined;
    icon?: React.ReactNode

}

export const CustomButton : React.FC<Props> = ({children, htmlType = 'button', type, danger, loading, shape, icon, onClick}) => {
  return (
    <Form.Item>
        <Button onClick={onClick} icon={icon} shape={shape} loading={loading} danger={danger} type={type} htmlType={htmlType}>{children}</Button>
    </Form.Item>
  )
}
