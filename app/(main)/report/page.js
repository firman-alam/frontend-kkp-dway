"use client"

import { MaterialReactTable, useMaterialReactTable } from "material-react-table"
import { useMemo, useState } from "react"

const ReportPage = () => {
  const data = [{ no: 1, tahun: "2024", nik: "123131233", nama: "Dwi" }]
  const columns = useMemo(
    () => [
      { accessorKey: "no", header: "No.", size: 50 },
      { accessorKey: "tahun", header: "Tahun", size: 50 },
      { accessorKey: "nik", header: "NIK", size: 70 },
      { accessorKey: "nama", header: "Nama", size: 70 },
    ],
    []
  )

  return (
    <main className="main">
      {/* Header */}
      <h3 className="title-black">Laporan</h3>
      {/* Divider */}
      <div className="divider" />

      {/* Table */}
      <div className="table">
        <p className="title-table">Tabel Rank Karyawan</p>
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
