'use client'

import { useGetAllCriteriaQuery } from '@/store/api/criteriaApi'
import { useUpdateNilaiMutation } from '@/store/api/matrixApi'
import { useGetAllPegawaiQuery } from '@/store/api/pegawaiApi'
import { Box, Dialog, Paper } from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { NumericFormat } from 'react-number-format'

export const ModalEditNilai = ({ open, onClose, data }) => {
  const resultObject = {}

  data?.details?.forEach((item) => {
    resultObject[item.id_kriteria] = item.nilai
  })

  const { control, handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: {
      id_penilaian: data?.id_penilaian,
      id_pegawai: data?.id_pegawai,
      tahun: data?.tahun,
      details: resultObject,
    },
  })

  console.log(watch())

  const { data: employee } = useGetAllPegawaiQuery()
  const { data: criteria } = useGetAllCriteriaQuery()
  const [updateData] = useUpdateNilaiMutation()

  const onSubmit = (value) => {
    value.id_penilaian = data?.id_penilaian
    updateData(value)
      .unwrap()
      .then(() => {})
      .catch((err) => console.log(err))
    console.log(value)
    onClose()
  }

  const handleSelectChange = (criterionId, selectedValue) => {
    setValue('details', {
      ...getValues('details'),
      [criterionId]: parseInt(selectedValue),
    })
  }

  useEffect(() => {
    data?.details?.map((d) => {
      setValue(`details_${d.id_kriteria}`, d.nilai)
    })
  }, [data])

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
          <p>Edit Nilai</p>
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
                  <select {...field} id='id_pegawai' className='input'>
                    {employee?.map((e) => (
                      <option value={e.id_pegawai} key={e.id_pegawai}>
                        {e.nama + ' - ' + e.nik}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div className='row'>
              <label htmlFor='tahun'>Tahun</label>
              <Controller
                control={control}
                name='tahun'
                render={({ field }) => (
                  <NumericFormat
                    name='tahun'
                    className='input'
                    inputProps={{ maxLength: 15 }}
                    value={field.value}
                    allowNegative={false}
                    onValueChange={(value) => {
                      const parsedValue = parseInt(value.value)
                      field.onChange(isNaN(parsedValue) ? null : parsedValue)
                    }}
                    fullWidth
                  />
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
                    <select
                      {...field}
                      onChange={(e) => {
                        handleSelectChange(c.id_kriteria, e.target.value)
                        setValue(
                          `details_${c.id_kriteria}`,
                          parseInt(e.target.value)
                        )
                      }}
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
            <button type='submit' className='button green-button'>
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
