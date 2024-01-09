import Sidebar from '@/components/sidebar/Sidebar'

const MainLayout = ({ children }) => {
  return (
    <main
      style={{
        display: 'flex',
        backgroundColor: 'var(--accent-color)',
        height: '100vh',
      }}
    >
      <div style={{ flex: 3 }}>
        <Sidebar />
      </div>
      <div style={{ flex: 9 }}>{children}</div>
    </main>
  )
}

export default MainLayout
