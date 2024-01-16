'use client'

import { useGetAllCriteriaQuery } from '@/store/api/criteriaApi'
import { useAddNilaiMutation } from '@/store/api/matrixApi'
import { useGetAllPegawaiQuery } from '@/store/api/pegawaiApi'
import { Box, Dialog, Paper } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { NumericFormat } from 'react-number-format'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const ModalAddNilai = ({ open, onClose, data }) => {
  const { data: employee } = useGetAllPegawaiQuery()
  const { data: criteria } = useGetAllCriteriaQuery()
  const [addData] = useAddNilaiMutation()

  const criteriaSchema = {}
  criteria?.forEach((c) => {
    const fieldName = `details_${c.id_kriteria}`
    criteriaSchema[fieldName] = z
      .number()
      .refine((data) => data !== 0, { message: `Harap pilih ${c.nama}` })
  })

  const schema = z.object({
    id_pegawai: z
      .number()
      .refine((data) => data !== 0, { message: 'Harap pilih Nama' }),
    tahun: z.number(),
    ...criteriaSchema,
  })

  const { control, handleSubmit, formState, setValue, getValues, reset } =
    useForm({
      // resolver: zodResolver(schema),
      defaultValues: {
        tahun: 2024,
        details: [],
      },
    })

  const onSubmit = (value) => {
    addData(value)
      .unwrap()
      .then((payload) => {})
      .catch((err) => console.log(err))
    onClose()
    reset()
  }

  const handleSelectChange = (criterionId, selectedValue) => {
    setValue('details', {
      ...getValues('details'),
      [criterionId]: selectedValue,
    })
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
          <p>Tambah Nilai</p>
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
              <label htmlFor='id_pegawai'>Nama</label>
              <Controller
                name='id_pegawai'
                control={control}
                render={({ field }) => (
                  <>
                    <select {...field} id='id_pegawai' className='input'>
                      <option value={0}>Harap Pilih</option>
                      {employee?.map((e) => {
                        const isIdPegawaiExists = data?.some(
                          (d) => d.id_pegawai === e.id_pegawai
                        )

                        if (!isIdPegawaiExists) {
                          return (
                            <option value={e.id_pegawai} key={e.id_pegawai}>
                              {e.nama + ' - ' + e.nik}
                            </option>
                          )
                        }

                        return null
                      })}
                    </select>
                    {formState.errors.id_pegawai && (
                      <span style={{ color: 'red' }}>
                        {formState.errors.id_pegawai.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className='row'>
              <label htmlFor='tahun'>Tahun</label>
              <Controller
                control={control}
                name='tahun'
                render={({ field }) => (
                  <>
                    <NumericFormat
                      name='tahun'
                      className='input'
                      inputProps={{ maxLength: 15 }}
                      value={field.value}
                      allowNegative={false}
                      onValueChange={(value) => {
                        const parsedValue = parseInt(value.value)
                        field.onChange(isNaN(parsedValue))
                      }}
                      fullWidth
                    />
                    {formState.errors.tahun && (
                      <span style={{ color: 'red' }}>
                        {formState.errors.tahun.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            {criteria?.map((c) => (
              <div className='row' key={c.id_kriteria}>
                <label htmlFor={`details_${c.id_kriteria}`}>{c.nama}</label>
                <Controller
                  name={`details_${c.id_kriteria}`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <select
                        {...field}
                        onChange={(e) =>
                          handleSelectChange(c.id_kriteria, e.target.value)
                        }
                        id={`details_${c.id_kriteria}`}
                        className='input'
                      >
                        <option value={0}>Harap Pilih</option>
                        {optionsValue?.map((e) => (
                          <option value={e.value} key={e.value}>
                            {e.label}
                          </option>
                        ))}
                      </select>
                      {formState.errors[`details_${c.id_kriteria}`] && (
                        <span style={{ color: 'red' }}>
                          {formState.errors[`details_${c.id_kriteria}`].message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
            ))}
          </Box>

          <div className='modal-button'>
            <button
              type='button'
              className='button red-button'
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type='submit'
              className='button green-button'
              onClick={handleSubmit(onSubmit)}
            >
              Tambah
            </button>
          </div>
        </form>
      </Box>
    </Dialog>
  )
}

const optionsValue = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
]
