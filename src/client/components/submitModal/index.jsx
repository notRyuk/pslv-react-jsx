import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material"

export default function SubmitModal({ children, handleSubmit, open, setOpen, title }) {
    const handleClose = () => setOpen(false)
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <div
                    style={{
                        display: "flex",
                        padding: "0 .5rem",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <DialogContent>
                        {children}
                    </DialogContent>
                </div>
                <DialogActions>
                    <Button
                        variant="filled"
                        color="error"
                        onClick={handleClose}
                        sx={{
                            color: "#d32f2f",
                            fontWeight: "550"
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="filled"
                        color="success"
                        // onClick={handleSubmit}
                        sx={{
                            color: "#029ffa"
                        }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}