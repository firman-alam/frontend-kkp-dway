'use client'

import { useSignOutMutation } from '@/store/api/authApi'
import { AuthContext } from '@/utils/authContext'
import Link from 'next/link'
import { useContext } from 'react'

import { MdPerson, MdList, MdTableRows, MdNote, MdLogout } from 'react-icons/md'

import styles from './page.module.css'

const Sidebar = () => {
  // const { signout } = useContext(AuthContext)
  const [signOut] = useSignOutMutation()

  const handleSignOut = () => {
    // signout()
    signOut()
  }

  return (
    <section className={styles.sidebar}>
      <h3 className='title'>PT. Bank Jasa Jakarta</h3>
      <div className='divider-white' />

      <nav>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <MdPerson />
            <Link href='/pegawai' style={{ textDecoration: 'none' }}>
              <p className={styles.menuLink}>Pegawai</p>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <MdList />
            <Link href='/kriteria' style={{ textDecoration: 'none' }}>
              <p className={styles.menuLink}>Kriteria</p>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <MdTableRows />
            <Link href='/matriks' style={{ textDecoration: 'none' }}>
              <p className={styles.menuLink}>Alternatif</p>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <MdNote />
            <Link href='/laporan' style={{ textDecoration: 'none' }}>
              <p className={styles.menuLink}>Laporan</p>
            </Link>
          </li>
          <li className={styles.menuItem} onClick={handleSignOut}>
            <MdLogout />
            <Link href='/sign-in' style={{ textDecoration: 'none' }}>
              <p className={styles.menuLink}>Keluar</p>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Sidebar
