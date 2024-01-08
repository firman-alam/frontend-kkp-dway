'use client'

import { Box, Dialog, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'

export const ModalAddEmployee = ({ open, onClose }) => {
  const { control, handleSubmit } = useForm()

  const onSubmit = (value) => {
    console.log(value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'md'}>
      <Box
        component={Paper}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
        }}
      >
        <Box className='modal-title'>
          <p>Tambah Pegawai</p>
          <button className='button' onClick={onClose}>
            <MdClose />
          </button>
        </Box>

        <div className='divider' />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginY: '1rem',
            }}
          >
            <div className='row'>
              <label htmlFor='password'>NIK</label>
              <input type='text' id='password' className='input' />
            </div>
            <div className='row'>
              <label htmlFor='name'>Nama</label>
              <input type='text' id='name' className='input' />
            </div>
            <div className='row'>
              <label htmlFor='name'>Alamat</label>
              <input type='text' id='name' className='input' />
            </div>
            <div className='row'>
              <label htmlFor='name'>No. Telepon</label>
              <input type='text' id='name' className='input' />
            </div>
            <div className='row'>
              <label htmlFor='name'>Divisi</label>
              <input type='text' id='name' className='input' />
            </div>
          </Box>

          <div className='modal-button'>
            <button
              type='button'
              className='button red-button'
              onClick={onClose}
            >
              Batal
            </button>
            <button type='submit' className='button green-button'>
              Tambah
            </button>
          </div>
        </form>
      </Box>
    </Dialog>
  )
}
