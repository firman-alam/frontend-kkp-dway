import Sidebar from '@/components/sidebar/Sidebar'

const MainLayout = ({ children }) => {
  return (
    <main style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div style={{ flex: 2 }}>
        <Sidebar />
      </div>
      <div style={{ flex: 10 }}>{children}</div>
    </main>
  )
}

export default MainLayout
