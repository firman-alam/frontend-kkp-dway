"use client"

import { ModalAddEmployee } from "@/components/modals/employee/modal-add-employee"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table"
import { useMemo, useState } from "react"
import { FaPlus } from "react-icons/fa"

const EmployeePage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const data = []
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

  const table = useMaterialReactTable({
    data,
    columns,
  })

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
        <MaterialReactTable table={table} />
      </div>

      {/* Modals */}
      <ModalAddEmployee open={openModalAdd} onClose={handleModalAdd} />
    </main>
  )
}

export default EmployeePage
