import React from 'react'
import styles from './index.module.css'
import { Layout as AntLayout } from 'antd'

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.main}>
        <AntLayout.Content style={{height: '100%'}}>

        {children}
        </AntLayout.Content>
    </div>
  )
}

export default Layout