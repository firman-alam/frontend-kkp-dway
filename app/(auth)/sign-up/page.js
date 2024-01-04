import Link from "next/link"
import styles from "./page.module.css"

const SignUpPage = () => {
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
          <label htmlFor="role" className={styles.label}>
            Role
          </label>
          <select id="role" className={styles.input}>
            <option value="admin">Admin</option>
            <option value="pimpinan">Pimpinan</option>
          </select>
        </div>
        <div className={styles.row}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input type="password" id="password" className={styles.input} />
        </div>

        <div className={styles.divider} />

        <button type="submit" className={styles.button}>
          Daftar
        </button>

        <Link href="/sign-in" style={{ textDecoration: "none" }}>
          <p className={styles.question}>
            Sudah punya akun? <span>Masuk</span>.
          </p>
        </Link>
      </form>
    </main>
  )
}

export default SignUpPage
