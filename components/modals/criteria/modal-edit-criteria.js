'use client'

import { Box, Dialog, Paper } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'

export const ModalEditCriteria = ({ open, onClose, data }) => {
  console.log(data)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      kode: data?.code,
      nama: data?.nama,
      tipe: data?.tipe,
      bobot: data?.bobot,
    },
  })

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
          <p>Edit Kriteria</p>
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
              <label htmlFor='kode'>Kode</label>
              <Controller
                name='kode'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    id='kode'
                    className='input'
                    value={field.value}
                  />
                )}
              />
            </div>

            <div className='row'>
              <label htmlFor='nama'>Nama</label>
              <Controller
                name='nama'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    id='nama'
                    className='input'
                    value={field.value}
                  />
                )}
              />
            </div>

            <div className='row'>
              <label htmlFor='bobot'>Bobot</label>
              <Controller
                name='bobot'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    id='bobot'
                    className='input'
                    value={field.value}
                  />
                )}
              />
            </div>

            <div className='row'>
              <label htmlFor='tipe'>Tipe</label>
              <Controller
                name='tipe'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    id='tipe'
                    className='input'
                    value={field.value}
                  />
                )}
              />
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
