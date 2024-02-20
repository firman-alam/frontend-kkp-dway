import { Box, Dialog, Paper } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { MdClose } from "react-icons/md"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  divisi: z.string(),
})

export const ModalAddDivision = ({ open, onClose }) => {
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (value) => {}

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"md"}>
      <Box
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Box className="modal-title">
          <p>Tambah Divisi</p>
          <button className="button" onClick={onClose}>
            <MdClose />
          </button>
        </Box>

        <div className="divider" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginY: "1rem",
            }}
          >
            <div className="row">
              <label htmlFor="divisi">Divisi</label>
              <Controller
                name="divisi"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      id="divisi"
                      className="input"
                    />
                    {formState.errors.divisi && (
                      <span style={{ color: "red" }}>
                        {formState.errors.divisi.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Box>

          <div className="modal-button">
            <button
              type="button"
              className="button red-button"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="button green-button">
              Tambah
            </button>
          </div>
        </form>
      </Box>
    </Dialog>
  )
}
