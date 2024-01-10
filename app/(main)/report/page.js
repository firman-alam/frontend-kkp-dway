"use client"

import { MaterialReactTable, useMaterialReactTable } from "material-react-table"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { NumericFormat } from "react-number-format"

const ReportPage = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      tahun: 2024,
      data: 25,
    },
  })

  const data = [{ no: 1, tahun: "2024", nik: "123131233", nama: "Dwi" }]
  const columns = useMemo(
    () => [
      { accessorKey: "kode", header: "Kode", size: 50 },
      { accessorKey: "tahun", header: "Tahun", size: 50 },
      { accessorKey: "nik", header: "NIK", size: 70 },
      { accessorKey: "nama", header: "Nama", size: 70 },
      { accessorKey: "divisi", header: "Divisi", size: 70 },
      { accessorKey: "hasil", header: "Hasil", size: 70 },
      { accessorKey: "rank", header: "Ranking", size: 70 },
    ],
    []
  )

  const onSubmit = (value) => {
    console.log(value)
  }

  return (
    <main className="main">
      {/* Header */}
      <h3 className="title-black">Laporan</h3>
      {/* Divider */}
      <div className="divider" />

      <div className="report">
        <div className="search-report">
          <Controller
            control={control}
            name="tahun"
            render={({ field }) => (
              <NumericFormat
                name="tahun"
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
          <Controller
            control={control}
            name="data"
            render={({ field }) => (
              <NumericFormat
                name="data"
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
          <button className="button" onClick={handleSubmit(onSubmit)}>
            Cari
          </button>
        </div>
        <div>
          <button className="button">Eksport</button>
        </div>
      </div>

      {/* Table */}
      <div className="table">
        <MaterialReactTable
          data={data}
          columns={columns}
          enableBottomToolbar={false}
          enableTopToolbar={false}
        />
      </div>
    </main>
  )
}

export default ReportPage
