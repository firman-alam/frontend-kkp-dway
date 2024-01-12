"use client"

import { ModalAddEmployee } from "@/components/modals/employee/modal-add-employee"
import { MaterialReactTable } from "material-react-table"
import { useMemo, useState } from "react"
import { FaPlus } from "react-icons/fa"

const EmployeePage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const data = [
    { no: 1, nik: 1231231231, nama: 'Dwi', alamat: 'Kebon Jeruk', no_telpon: 123123123, divisi: 'IT'},
    { no: 2, nik: 1231231231, nama: 'Budi', alamat: 'Kebon Jeruk', no_telpon: 123123123, divisi: 'IT'},
    { no: 3, nik: 1231231231, nama: 'Setia', alamat: 'Kebon Jeruk', no_telpon: 123123123, divisi: 'Finance'},
  ]

  const columns = useMemo(
    () => [
      { accessorKey: "no", header: "No.", size: 100 },
      { accessorKey: "nik", header: "NIK", size: 100 },
      { accessorKey: "nama", header: "Nama", size: 100 },
      { accessorKey: "alamat", header: "Alamat", size: 100 },
      { accessorKey: "no_telpon", header: "No. Telepon", size: 100 },
      { accessorKey: "divisi", header: "Divisi", size: 100 },
      { accessorKey: "aksi", header: "Aksi", size: 100 },
    ],
    []
  )

  const handleModalAdd = () => {
    setOpenModalAdd((prev) => !prev)
  }

  return (
    <main className="main">
      {/* Header */}
      <h3 className="title-black">Pegawai</h3>

      {/* Divider */}
      <div className="divider" />

      <div className="add">
        <button type="button" className="button" onClick={handleModalAdd}>
          Tambah
          <FaPlus />
        </button>
      </div>

      {/* Table */}
      <div className="table">
        <MaterialReactTable data={data} columns={columns} />
      </div>

      {/* Modals */}
      <ModalAddEmployee open={openModalAdd} onClose={handleModalAdd} />
    </main>
  )
}

export default EmployeePage
