import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    IconButton,
    Stack,
    Chip
} from "@mui/material"
import { useGetter } from "../../hooks/fetcher"
import urls, { basePath } from "../../../utils/urls"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useFormik, FormikProvider } from "formik";


export default function Institute() {
    const { data: instituteData } = useGetter(basePath + urls.institute.findAll)
    const initialValues = {
        name: "",
        contact: {
            emails: [],
            phone: [],
            social: {
                facebook: "",
                instagram: "",
                x: "",
                quora: "",
                others: []
            }
        },
        address: {
            line1: "",
            line2: "",
            street: "",
            landmark: "",
            city: "",
            state: "",
            country: "",
            pinCode: 0
        }
    }
    const form = useFormik({
        initialValues
    })

    const { values: formData, handleChange: handleChangeFormData, setValues: setFormData } = form
    const [email, setEmail] = useState("")
    const handleAddEmail = () => {
        const currentForm = structuredClone(formData)
        if(!currentForm.contact.emails.includes(email.trim()))
            currentForm.contact.emails.push(email)
        setFormData(currentForm)
        setEmail("")
    }
    const handleRemoveEmail = (e) => {
        console.log(e.target.value)
    }

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
                            {instituteData?.data?.map((e, i) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                    key={i}
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
                        onChange={handleChangeFormData}
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
                            onChange={handleChangeFormData}
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
                            onChange={handleChangeFormData}
                            fullWidth
                        />
                    </Stack>
                    <Stack direction={"row"} gap={"1rem"}>
                        <TextField
                            variant="filled"
                            label="Street"
                            name="address.street"
                            onChange={handleChangeFormData}
                            required
                            fullWidth
                        />
                        <TextField
                            variant="filled"
                            label="City"
                            name="address.city"
                            onChange={handleChangeFormData}
                            fullWidth
                            required
                        />
                    </Stack>
                    <Stack direction={"row"} gap={"1rem"}>
                        <TextField
                            variant="filled"
                            label="State"
                            name="address.state"
                            onChange={handleChangeFormData}
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
                                onChange={handleChangeFormData}
                                required
                                fullWidth
                            />
                        </Box>
                        <Box width={"30%"}>
                            <TextField
                                variant="filled"
                                label="Pin code"
                                name="address.pinCode"
                                onChange={handleChangeFormData}
                                required
                                fullWidth
                                type="number"
                                autoComplete="off"
                                inputProps={{
                                    "-webkit-outer-spin-button": {
                                        "-webkit-appearance": "none",
                                        appearance: "none",

                                    }
                                }}
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
                    <Stack direction={"row"} gap={"1rem"} alignItems={"center"} justifyContent={"center"}>
                        <Box width={"90%"}>
                            <TextField 
                                variant="filled"
                                label="Email"
                                name="email"
                                fullWidth
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value.trim())}
                                value={email}
                                type="email"
                            />
                        </Box>
                        <Box width={"10%"}>
                            <Button 
                                variant="contained" 
                                fullWidth
                                onClick={handleAddEmail}
                            >Add Email</Button>
                        </Box>
                    </Stack>
                    <Box>
                        {formData.contact.emails.map(e => (
                            <Chip label={e} onDelete={handleRemoveEmail} />
                        ))}
                    </Box>
                </Paper>
            </Box>
        </Stack>
    )
}