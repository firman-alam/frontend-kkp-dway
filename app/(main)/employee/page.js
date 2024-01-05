"use client"

import { ModalAddEmployee } from "@/components/modals/employee/modal-add-employee"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table"
import { useMemo, useState } from "react"
import { FaPen, FaPlus, FaTrash } from "react-icons/fa"

const EmployeePage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const data = [
    {
      no: 1,
      nik: 10000000001,
      nama: "Dwi",
      alamat: "Kebon Jeruk",
      no_telepon: "08220000000",
      divisi: "IT",
    },
    {
      no: 2,
      nik: 20000000001,
      nama: "Budi",
      alamat: "Palmerah",
      no_telepon: "08220000000",
      divisi: "IT",
    },
  ]

  const columns = useMemo(
    () => [
      { accessorKey: "no", header: "No.", size: 100 },
      { accessorKey: "nik", header: "NIK", size: 100 },
      { accessorKey: "nama", header: "Nama", size: 100 },
      { accessorKey: "alamat", header: "Alamat", size: 100 },
      { accessorKey: "no_telepon", header: "No. Telepon", size: 100 },
      { accessorKey: "divisi", header: "Divisi", size: 100 },
      {
        accessorKey: "aksi",
        header: "Aksi",
        size: 100,
        Cell: (params) => {
          return (
            <div className="action-wrapper">
              <button className="button green-button">
                <FaPen size={15} />
              </button>
              <button className="button red-button">
                <FaTrash size={15} />
              </button>
            </div>
          )
        },
      },
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
      <ModalAddEmployee
        open={openModalAdd}
        onClose={handleModalAdd}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        enableColumnFilters={false}
      />
    </main>
  )
}

export default EmployeePage
