import Link from 'next/link'

import { MdPerson, MdList, MdTableRows, MdNote, MdLogout } from "react-icons/md"

import styles from "./page.module.css"

const Sidebar = () => {
  return (
    <section className={styles.sidebar}>
      <h3 className="title">PT. Dwi Setiabudi</h3>
      <div className="divider-white" />
      <nav>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <MdPerson />
            <Link href="/employee" style={{ textDecoration: "none" }}>
              <p className={styles.menuLink}>Pegawai</p>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <MdList />
            <Link href="/criteria" style={{ textDecoration: "none" }}>
              <p className={styles.menuLink}>Kriteria</p>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <MdTableRows />
            <Link href="/matrix" style={{ textDecoration: "none" }}>
              <p className={styles.menuLink}>Matriks</p>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <MdNote />
            <Link href="/report" style={{ textDecoration: "none" }}>
              <p className={styles.menuLink}>Laporan</p>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <MdLogout />
            <Link href="/sign-in" style={{ textDecoration: "none" }}>
              <p className={styles.menuLink}>Keluar</p>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Sidebar
