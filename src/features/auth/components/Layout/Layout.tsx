import styles from './Layout.module.css'

type LayoutProps = {
  children: React.ReactNode
  title: string
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <main className={styles['main-layout']}>
      <h2 className={styles['main-layout_title']}>{title}</h2>
      {children}
    </main>
  )
}
