"use client"

import { Box, Dialog, Paper } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { MdClose } from "react-icons/md"
import { NumericFormat } from "react-number-format"

export const ModalEditCriteria = ({ open, onClose, data }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      kode: data.kode,
      nama: data.nama,
      tipe: data.tipe,
      bobot: data.bobot,
    },
  })

  const onSubmit = (value) => {
    console.log(value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"md"}>
      <Box
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Box className="modal-title">
          <p>Edit Kriteria</p>
          <button className="button" onClick={onClose}>
            <MdClose />
          </button>
        </Box>

        <div className="divider" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginY: "1rem",
            }}
          >
            <div className="row">
              <label htmlFor="kode">Kode</label>
              <Controller
                name="kode"
                control={control}
                render={({ field }) => (
                  <input {...field} type="text" id="kode" className="input" />
                )}
              />
            </div>

            <div className="row">
              <label htmlFor="nama">Nama</label>
              <Controller
                name="nama"
                control={control}
                render={({ field }) => (
                  <input {...field} type="text" id="nama" className="input" />
                )}
              />
            </div>

            <div className="row">
              <label htmlFor="bobot">Bobot</label>
              <Controller
                name="bobot"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    name="bobot"
                    inputProps={{ maxLength: 15 }}
                    value={field.value}
                    allowNegative={false}
                    onValueChange={(value) => {
                      const parsedValue = parseInt(value.value)
                      field.onChange(isNaN(parsedValue) ? null : parsedValue)
                    }}
                  />
                )}
              />
            </div>

            <div className="row">
              <label htmlFor="tipe">Tipe</label>
              <Controller
                name="tipe"
                control={control}
                render={({ field }) => (
                  <select {...field} id="tipe" className="input">
                    <option value="benefit">Benefit</option>
                    <option value="cost">Cost</option>
                  </select>
                )}
              />
            </div>
          </Box>

          <div className="modal-button">
            <button
              type="button"
              className="button red-button"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="button green-button">
              Tambah
            </button>
          </div>
        </form>
      </Box>
    </Dialog>
  )
}
