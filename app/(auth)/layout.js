const AuthLayout = ({ children }) => {
  return (
    <div className='auth'>
      <div className='auth-left'>{children}</div>
      <div className='auth-right'>
        <p>Selamat datang di</p>
        <p>sistem penunjang keputusan</p>
        <p>pemilihan pegawai terbaik</p>
        <p className='title-company'>di pt. bank jasa jakarta</p>
      </div>
    </div>
  )
}

export default AuthLayout
