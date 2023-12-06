import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    IconButton
} from "@mui/material"
import { useGetter } from "../../hooks/fetcher"
import urls, { basePath } from "../../../utils/urls"
import DeleteIcon from '@mui/icons-material/Delete';


export default function Institute() {
    const { data: instituteData } = useGetter(basePath + urls.institute.findAll)
    console.log(instituteData)
    return (
        <>
            <Box
                width={"100%"}
                flex
                flexDirection={"column"}
                gap={"1rem"}
            >
                <Typography variant="h4">Institutes</Typography>
                <Box
                    width={"100%"}
                    flex
                    flexDirection={"row"}
                    gap={"1rem"}
                >
                    <Box
                        sx={{
                            width: "35%"
                        }}
                    >
                        <Button
                            variant="contained"
                            fullWidth
                        >
                            New Institute
                        </Button>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem"
                            }}
                        >
                            {instituteData?.data?.map(e => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Paper
                                        sx={{
                                            padding: ".5rem",
                                            width: "90%"
                                        }}
                                    >
                                        <Typography variant="body1">{e?.name}</Typography>
                                    </Paper>
                                    <IconButton color="primary" aria-label="add to shopping cart">
                                        <DeleteIcon sx={{color: "red" }} />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}