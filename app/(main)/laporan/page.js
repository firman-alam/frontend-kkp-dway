"use client"

import { useGetRanksQuery } from "@/store/api/matrixApi"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { NumericFormat } from "react-number-format"

const ReportPage = () => {
  const router = useRouter()

  const [query, setQuery] = useState({ tahun: 2024, size: 25 })

  const { data, refetch } = useGetRanksQuery({
    tahun: query.tahun,
    size: query.size,
  })

  const columns = useMemo(
    () => [
      { accessorKey: "alternatif", header: "Kode", size: 50 },
      { accessorKey: "tahun", header: "Tahun", size: 50 },
      { accessorKey: "nik", header: "NIK", size: 70 },
      { accessorKey: "nama", header: "Nama", size: 70 },
      { accessorKey: "divisi", header: "Divisi", size: 70 },
      { accessorKey: "total", header: "Hasil", size: 70 },
      { accessorKey: "rank", header: "Ranking", size: 70, Cell: params => {
        return params.row.index + 1
      } },
    ],
    [data]
  )

  const handleExport = () => {
    router.push(`/pdf?method=laporan&tahun=${query.tahun}&size=${query.size}`)
  }

  const handleSearch = () => {
    refetch()
  }

  return (
    <main className="main">
      {/* Header */}
      <h3 className="title-black">Preferensi</h3>
      {/* Divider */}
      <div className="divider" />

      <div className="report">
        <div className="search-report">
          <NumericFormat
            name="tahun"
            inputProps={{ maxLength: 15 }}
            value={query.tahun}
            allowNegative={false}
            onValueChange={(value) => {
              const parsedValue = parseInt(value.value)
              setQuery((prev) => ({
                ...prev,
                tahun: isNaN(parsedValue) ? null : parsedValue,
              }))
            }}
            fullWidth
          />
          <NumericFormat
            name="size"
            inputProps={{ maxLength: 15 }}
            value={query.size}
            allowNegative={false}
            onValueChange={(value) => {
              const parsedValue = parseInt(value.value)
              setQuery((prev) => ({
                ...prev,
                size: isNaN(parsedValue) ? null : parsedValue,
              }))
            }}
            fullWidth
          />
          <button className="button" onClick={handleSearch}>
            Cari
          </button>
        </div>
        <div>
          <button className="button" onClick={handleExport}>
            Eksport
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table">
        <MaterialReactTable
          data={data || []}
          columns={columns}
          enableBottomToolbar={false}
          enableTopToolbar={false}
        />
      </div>
    </main>
  )
}

const data = [
  {
    no: 1,
    tahun: "2024",
    nik: "123131233",
    nama: "Dwi",
    divisi: "IT",
    hasil: 10,
    rank: 1,
  },
  {
    no: 2,
    tahun: "2024",
    nik: "123131233",
    nama: "Budi",
    divisi: "Security",
    hasil: 9,
    rank: 2,
  },
  {
    no: 3,
    tahun: "2024",
    nik: "123131233",
    nama: "Andri",
    divisi: "Audit",
    hasil: 8,
    rank: 3,
  },
  {
    no: 4,
    tahun: "2024",
    nik: "123131233",
    nama: "Okta",
    divisi: "Finance",
    hasil: 7,
    rank: 4,
  },
  {
    no: 5,
    tahun: "2024",
    nik: "123131233",
    nama: "Indro",
    divisi: "IT",
    hasil: 6,
    rank: 5,
  },
]

export default ReportPage
