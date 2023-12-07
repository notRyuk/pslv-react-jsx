import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    IconButton,
    Stack
} from "@mui/material"
import { useGetter } from "../../hooks/fetcher"
import urls, { basePath } from "../../../utils/urls"
import DeleteIcon from '@mui/icons-material/Delete';


export default function Institute() {
    const { data: instituteData } = useGetter(basePath + urls.institute.findAll)
    console.log(instituteData)
    return (
        <Stack direction={"row"} gap={"1rem"}>
            <Box
                width={"25%"}
                flex
                flexDirection={"column"}
                gap={"1rem"}
                minHeight={"80vh"}
            >
                <Typography variant="h4">Institutes</Typography>
                <Box
                    width={"100%"}
                    flex
                    flexDirection={"row"}
                    gap={"1rem"}
                >
                    <Box
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
                                            width: "95%"
                                        }}
                                    >
                                        <Typography variant="body1">{e?.name}</Typography>
                                    </Paper>
                                    <IconButton color="primary" aria-label="add to shopping cart">
                                        <DeleteIcon sx={{ color: "red" }} />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    width: "75%"
                }}
            >
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        padding: "1rem"
                    }}
                >
                    <Typography variant="h5">Institute Name</Typography>
                    <TextField
                        variant="filled"
                        label="Enter Institute Name"
                        name="name"
                    />
                </Paper>
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        padding: "1rem"
                    }}
                >
                    <Typography variant="h5">Enter Institute Address</Typography>
                    <Stack direction={"row"} gap={"1rem"}>
                        <TextField
                            variant="filled"
                            label="Line 1"
                            name="address.line1"
                            required
                            fullWidth
                        />
                        <TextField
                            variant="filled"
                            label="Line 2"
                            name="address.line2"
                            fullWidth
                        />
                    </Stack>
                    <Stack direction={"row"} gap={"1rem"}>
                        <TextField
                            variant="filled"
                            label="Landmark"
                            name="address.landmark"
                            fullWidth
                        />
                    </Stack>
                    <Stack direction={"row"} gap={"1rem"}>
                        <TextField
                            variant="filled"
                            label="Street"
                            name="address.street"
                            required
                            fullWidth
                        />
                        <TextField
                            variant="filled"
                            label="City"
                            name="address.city"
                            fullWidth
                            required
                        />
                    </Stack>
                    <Stack direction={"row"} gap={"1rem"}>
                        <TextField
                            variant="filled"
                            label="State"
                            name="address.state"
                            required
                            fullWidth
                        />
                    </Stack>
                    <Stack direction={"row"} gap={"1rem"}>
                        <Box width={"70%"}>
                            <TextField
                                variant="filled"
                                label="Country"
                                name="address.country"
                                required
                                fullWidth
                            />
                        </Box>
                        <Box width={"30%"}>
                            <TextField
                                variant="filled"
                                label="Pin code"
                                name="address.pinCode"
                                required
                                fullWidth
                            />
                        </Box>
                    </Stack>
                </Paper>
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        padding: "1rem"
                    }}
                >
                    <Typography variant="h5">Add Socials</Typography>
                    
                    <Stack direction={"row"} gap={"1rem"}>
                        
                    </Stack>
                </Paper>
            </Box>
        </Stack>
    )
}