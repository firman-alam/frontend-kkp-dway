import Sidebar from '@/components/sidebar/Sidebar'

const MainLayout = ({ children }) => {
  return (
    <main
      style={{
        display: 'flex',
        backgroundColor: '#ead196',
        height: '100%',
      }}
    >
      <div style={{ flex: 3 }}>
        <Sidebar />
      </div>
      <div style={{ flex: 9, width: '80%', height: '100vh', overflow: 'auto' }}>
        {children}
      </div>
    </main>
  )
}

export default MainLayout
