import styles from './page.module.css'

const SignInPage = () => {
  return (
    <main className={styles.main}>
      <h3>Sign Up</h3>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor='name' className={styles.label}>
            Nama
          </label>
          <input type='text' id='name' className={styles.input} />
        </div>
        <div className={styles.row}>
          <label htmlFor='password' className={styles.label}>
            Password
          </label>
          <input type='password' id='password' className={styles.input} />
        </div>

        <div className={styles.divider} />

        <button type='submit' className={styles.button}>
          Masuk
        </button>

        <p>
          Belum punya akun? <span>Sign Up</span>.
        </p>
      </form>
    </main>
  )
}

export default SignInPage
