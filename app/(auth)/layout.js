const AuthLayout = ({ children }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        padding: 0,
        backgroundColor: "var(--primary-color)",
      }}
    >
      {children}
    </div>
  )
}

export default AuthLayout
