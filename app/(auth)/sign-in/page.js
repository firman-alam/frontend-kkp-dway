import Link from "next/link"
import styles from "./page.module.css"

const SignInPage = () => {
  return (
    <main className={styles.main}>
      <h3 className="title">Selamat datang!</h3>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="name" className={styles.label}>
            Nama
          </label>
          <input type="text" id="name" className={styles.input} />
        </div>
        <div className={styles.row}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input type="password" id="password" className={styles.input} />
        </div>

        <div className={styles.divider} />

        <button type="submit" className={styles.button}>
          Masuk
        </button>

        <Link href="/sign-up" style={{ textDecoration: "none" }}>
          <p className={styles.question}>
            Belum punya akun? <span>Daftar</span>.
          </p>
        </Link>
      </form>
    </main>
  )
}

export default SignInPage
