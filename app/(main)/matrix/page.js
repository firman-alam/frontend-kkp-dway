'use client'

import { ModalAddNilai } from '@/components/modals/matrix/modal-add-nilai'
import { useGetAllCriteriaQuery } from '@/store/api/criteriaApi'
import { useGetAllNilaiQuery } from '@/store/api/matrixApi'
import { MaterialReactTable } from 'material-react-table'
import { useMemo, useState } from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'

const MatrixPage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const { data: criteria } = useGetAllCriteriaQuery()
  const { data: nilai } = useGetAllNilaiQuery()

  const handleModalAdd = () => {
    setOpenModalAdd((prev) => !prev)
  }

  const columnsA = useMemo(
    () => [
      { accessorKey: 'no', header: 'No.', size: 50 },
      { accessorKey: 'tahun', header: 'Tahun', size: 50 },
      { accessorKey: 'nik', header: 'NIK', size: 70 },
      { accessorKey: 'nama', header: 'Nama', size: 70 },
      // {
      //   accessorKey: 'aksi',
      //   header: 'Aksi',
      //   size: 100,
      //   Cell: (params) => {
      //     return (
      //       <div className='action-wrapper'>
      //         <button className='button green-button'>
      //           Edit <FaPen />
      //         </button>
      //         <button className='button red-button'>
      //           Hapus <FaTrash />
      //         </button>
      //       </div>
      //     )
      //   },
      // },
    ],
    []
  )

  const columnsC = useMemo(() => {
    return (
      criteria?.map((c) => ({
        accessorKey: `${c.id_kriteria}`,
        header: `${c.code}`,
        size: 100,
        Cell: (params) => {
          const details = params.row.original.details

          const data = details.find((d) => d.id_kriteria === c.id_kriteria)

          return data?.nilai
        },
      })) || []
    )
  }, [criteria])

  const allColumns = useMemo(
    () => columnsA.concat(columnsC),
    [columnsA, columnsC]
  )

  const columnsB = useMemo(
    () => [{ accessorKey: 'kode_alternatif', header: 'Kode Alternatif' }],
    []
  )

  return (
    <main className='main'>
      {/* Header */}
      <h3 className='title-black'>Matriks</h3>
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
        <p className='title-table'>Tabel Nilai Pegawai</p>
        <MaterialReactTable data={nilai || []} columns={allColumns} />
      </div>

      <div className='table'>
        <p className='title-table'>Tabel Matriks Nilai Pegawai</p>
        <MaterialReactTable data={[]} columns={columnsB} />
      </div>

      {/* Modals */}
      <ModalAddNilai open={openModalAdd} onClose={handleModalAdd} />
    </main>
  )
}

export default MatrixPage
