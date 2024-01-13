import { useDeleteCriteriaMutation } from "@/store/api/criteriaApi"
import { useDeleteNilaiMutation } from "@/store/api/matrixApi"
import { useDeletePegawaiMutation } from "@/store/api/pegawaiApi"
import { Box, Dialog, Paper } from "@mui/material"
import { FaQuestionCircle } from "react-icons/fa"
import { MdClose } from "react-icons/md"

const ModalDelete = ({ open, onClose, id, title }) => {
  const [deleteKriteria] = useDeleteCriteriaMutation()
  const [deleteNilai] = useDeleteNilaiMutation()
  const [deletePegawai] = useDeletePegawaiMutation()

  const handleDelete = () => {
    switch (title) {
      case "pegawai":
        deletePegawai({ id }).unwrap().then((payload) => {}).catch((err) => console.log(err))
        onClose()
        break
      case "nilai":
        deleteNilai({ id }).unwrap().then((payload) => {}).catch((err) => console.log(err))
        onClose()
        break
      case "kriteria":
        deleteKriteria({ id }).unwrap().then(() => {}).catch((err) => console.log(err))
        onClose()
        break
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"xs"}>
      <Box
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Box className="modal-title">
          <p>Hapus data</p>
          <button className="button" onClick={onClose}>
            <MdClose />
          </button>
        </Box>

        <div className="divider" />

        <div className="delete-confirm">
          <FaQuestionCircle size={40} />
          <p>Apakah yakin menghapus data ini?</p>
        </div>

        <div className="modal-button">
          <button
            type="button"
            className="button green-button"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="submit"
            className="button red-button"
            onClick={handleDelete}
          >
            Hapus
          </button>
        </div>
      </Box>
    </Dialog>
  )
}

export default ModalDelete
