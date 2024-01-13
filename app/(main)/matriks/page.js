'use client'

import ModalDelete from '@/components/modals/delete/modal-delete'
import { ModalAddNilai } from '@/components/modals/matrix/modal-add-nilai'
import { ModalEditNilai } from '@/components/modals/matrix/modal-edit-nilai'
import { useGetAllCriteriaQuery } from '@/store/api/criteriaApi'
import {
  useGetAllNilaiQuery,
  useGetMatriksQuery,
  useLazyGetNilaiQuery,
} from '@/store/api/matrixApi'
import { MaterialReactTable } from 'material-react-table'
import { useMemo, useState } from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'


const MatrixPage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [idEdit, setIdEdit] = useState(0)

  const { data: criteria } = useGetAllCriteriaQuery()
  const { data } = useGetAllNilaiQuery()
  const [getData, { data: nilai }] = useLazyGetNilaiQuery()
  const { data: matriks } = useGetMatriksQuery()

  const handleModalAdd = () => {
    setOpenModalAdd((prev) => !prev)
  }

  const handleModalEdit = () => {
    setOpenModalEdit((prev) => !prev)
  }

  const handleModalDelete = () => {
    setOpenModalDelete((prev) => !prev)
  }

  const columnsA = useMemo(
    () => [
      {
        accessorKey: 'no',
        header: 'No.',
        size: 50,
        Cell: (params) => {
          return params.row.index + 1
        },
      },
      { accessorKey: 'tahun', header: 'Tahun', size: 50 },
      { accessorKey: 'nik', header: 'NIK', size: 70 },
      { accessorKey: 'nama', header: 'Nama', size: 70 },
    ],
    [data]
  )

  const columns = useMemo(() => {
    const criteriaColumns = criteria?.map((c) => ({
      accessorKey: `${c.id_kriteria}`,
      header: `${c.code}`,
      size: 100,
      Cell: (params) => {
        const details = params.row.original.details;
        const data = details.find((d) => d.id_kriteria === c.id_kriteria);
        return data?.nilai;
      },
    })) || [];
  
    const actionColumn = {
      accessorKey: 'aksi',
      header: 'Aksi',
      size: 100,
      Cell: (params) => (
        <div className='action-wrapper'>
          <button
            className='button green-button'
            onClick={() => {
              setIdEdit(params.row.original.id_penilaian);
              handleModalEdit();
              getData({ id: params.row.original.id_penilaian });
            }}
          >
            Edit <FaPen />
          </button>
          <button
            className='button red-button'
            onClick={() => {
              setIdEdit(params.row.original.id_penilaian);
              handleModalDelete();
            }}
          >
            Hapus <FaTrash />
          </button>
        </div>
      ),
    };
  
    return [...criteriaColumns, actionColumn];
  }, [criteria, data]);
  
  const allColumnsA = useMemo(() => {
    return [...columnsA, ...columns];
  }, [columnsA, columns]);

  const columnsC = useMemo(
    () => [{ accessorKey: 'alternatif', header: 'Kode Alternatif' }],
    []
  )

  const columnsKriteria = useMemo(() => {
    return (
      criteria?.map((c) => ({
        accessorKey: `${c.id_kriteria}`,
        header: `${c.code}`,
        size: 100,
        Cell: (params) => {
          const details = params.row.original.details

          const data = details.find((d) => d.id_kriteria === c.id_kriteria)

          return data?.preferensi
        },
      })) || []
    )
  }, [criteria])

  const allColumnsB = useMemo(
    () => columnsC.concat(columnsKriteria),
    [columnsA, columnsKriteria]
  )

  return (
    <main className='main'>
      {/* Header */}
      <h3 className='title-black'>Nilai Alternatif</h3>
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
        <MaterialReactTable
          data={data || []}
          columns={allColumnsA}
          enableBottomToolbar={false}
          enableTopToolbar={false}
          initialState={{
            columnOrder: [
              ...allColumnsA.map(column => column.accessorKey), 
              'aksi', 
            ],
          }}
        />
      </div>

      <div className='table'>
        <p className='title-table'>Tabel Matriks Nilai Pegawai</p>
        <MaterialReactTable
          data={matriks || []}
          columns={allColumnsB}
          enableBottomToolbar={false}
          enableTopToolbar={false}
        />
      </div>

      {/* Modals */}
      <ModalAddNilai open={openModalAdd} onClose={handleModalAdd} />
      {nilai !== undefined && nilai.id_penilaian === idEdit && (
        <ModalEditNilai
          open={openModalEdit}
          onClose={handleModalEdit}
          data={nilai}
        />
      )}
      <ModalDelete
        open={openModalDelete}
        onClose={handleModalDelete}
        id={idEdit}
        title='nilai'
      />
    </main>
  )
}

export default MatrixPage
