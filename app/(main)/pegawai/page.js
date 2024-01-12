'use client'

import ModalDelete from '@/components/modals/delete/modal-delete'
import { ModalAddEmployee } from '@/components/modals/employee/modal-add-employee'
import { ModalEditEmployee } from '@/components/modals/employee/modal-edit-employee'
import {
  useGetAllPegawaiQuery,
  useLazyGetPegawaiByIdQuery,
} from '@/store/api/pegawaiApi'
import { MaterialReactTable } from 'material-react-table'
import { useMemo, useState } from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'

const EmployeePage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [idEdit, setIdEdit] = useState(0)

  const { data: employees } = useGetAllPegawaiQuery()
  const { data: employee } = useLazyGetPegawaiByIdQuery()

  const handleModalAdd = () => {
    setOpenModalAdd((prev) => !prev)
  }

  const handleModalEdit = () => {
    setOpenModalEdit((prev) => !prev)
  }

  const handleModalDelete = () => {
    setOpenModalDelete((prev) => !prev)
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'no',
        header: 'No.',
        size: 100,
        Cell: (params) => {
          return params.row.index + 1
        },
      },
      { accessorKey: 'nik', header: 'NIK', size: 100 },
      { accessorKey: 'nama', header: 'Nama', size: 100 },
      { accessorKey: 'alamat', header: 'Alamat', size: 100 },
      { accessorKey: 'no_telepon', header: 'No. Telepon', size: 100 },
      { accessorKey: 'divisi', header: 'Divisi', size: 100 },
      {
        accessorKey: 'aksi',
        header: 'Aksi',
        Cell: (params) => {
          return (
            <div className='action-wrapper'>
              <button
                className='button green-button'
                onClick={() => {
                  setIdEdit(params.row.original.id_pegawai)
                  handleModalEdit()
                }}
              >
                Edit <FaPen />
              </button>
              <button
                className='button red-button'
                onClick={() => {
                  setIdEdit(params.row.original.id_pegawai)
                  handleModalDelete()
                }}
              >
                Hapus <FaTrash />
              </button>
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <main className='main'>
      {/* Header */}
      <h3 className='title-black'>Pegawai</h3>

      {/* Divider */}
      <div className='divider' />

      <div className='add'>
        <button type='button' className='button' onClick={handleModalAdd}>
          Tambah
          <FaPlus />
        </button>
      </div>

      {/* Table */}
      <div className='table'>
        <MaterialReactTable
          data={employees || []}
          columns={columns}
          enableBottomToolbar={false}
          enableTopToolbar={false}
          enableColumnFilters={false}
        />
      </div>

      {/* Modals */}
      <ModalAddEmployee open={openModalAdd} onClose={handleModalAdd} />
      {employee !== undefined && employee.id_pegawai === idEdit && (
        <ModalEditEmployee
          open={openModalEdit}
          onClose={handleModalEdit}
          data={employee}
        />
      )}
      <ModalDelete
        open={openModalDelete}
        onClose={handleModalDelete}
        id={idEdit}
        title='pegawai'
      />
    </main>
  )
}

export default EmployeePage
