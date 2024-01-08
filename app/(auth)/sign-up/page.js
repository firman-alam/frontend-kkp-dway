'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { useSignUpMutation } from '@/store/api/authApi'
import { Controller, useForm } from 'react-hook-form'

const SignUpPage = () => {
  const [signUp] = useSignUpMutation()

  const { control, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    signUp(data)
      .unwrap()
      .then((payload) => console.log(payload))
      .catch((error) => console.error(error))
  }

  return (
    <main className={styles.main}>
      <h3 className='title'>Selamat datang!</h3>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor='username' className={styles.label}>
            Nama
          </label>
          <Controller
            name='username'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <input
                {...field}
                type='text'
                id='username'
                className={styles.input}
              />
            )}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor='role' className={styles.label}>
            Role
          </label>
          <Controller
            name='role'
            control={control}
            defaultValue='admin' // Set default value if needed
            render={({ field }) => (
              <select {...field} id='role' className={styles.input}>
                <option value='admin'>Admin</option>
                <option value='pimpinan'>Pimpinan</option>
              </select>
            )}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor='password' className={styles.label}>
            Password
          </label>
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <input
                {...field}
                type='password'
                id='password'
                className={styles.input}
              />
            )}
          />
        </div>

        <div className={styles.divider} />

        <button
          type='submit'
          className={styles.button}
          onClick={handleSubmit(onSubmit)}
        >
          Daftar
        </button>

        <Link href='/sign-in' style={{ textDecoration: 'none' }}>
          <p className={styles.question}>
            Sudah punya akun? <span>Masuk</span>.
          </p>
        </Link>
      </form>
    </main>
  )
}

export default SignUpPage
