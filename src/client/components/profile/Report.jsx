import React, { useState } from 'react'
import classes from "./styles.module.scss"
import urls, { basePath } from '../../../utils/urls';
import {usePoster } from '../../hooks/fetcher';
import { toast } from 'react-toastify';
import SubmitModal from '../submitModal';
import { Box, TextField } from '@mui/material';
import { Stack } from 'react-bootstrap';

const Report = ({userId}) => {
    const reportUrl = basePath + urls.report.create
    const [showModal, setShowModal] = useState(false)
    const [reason, setReason] = useState("")
    const {data : reportedData, trigger: reportUser} = usePoster(reportUrl)

    const handleReport = async (e) => {
        e.preventDefault();
        const res = await reportUser({
            user: userId,
            reason: reason
        })
        console.log(res);
        if (res?.status === "success") {
            setShowModal(false);
            setReason("")
            toast.success("Reported User Successfully")
        }
        else {
            toast.error("Something went wrong!!")
        }
    }

    return (
        <>
            <button className={`${classes.report}`} onClick={()=>setShowModal(true)}>
                Report
            </button>
            <SubmitModal
                open={showModal}
                setOpen={setShowModal}
                title={"Add Reasons"}
                handleSubmit={handleReport}
            >
                <Box noValidate sx={{ mt: 2, color: 'white' }} className='formContainer' padding={'1rem'}>
                    <Stack sx={{ mt: 2 }} direction={'row'} spacing={2}>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="reason"
                            label="Reason of Report"
                            id="userBio"
                            multiline
                            onChange={(e) => setReason(e.target.value)}
                            rows={2}
                            autoComplete="userBio"
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white"
                                },
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                                    color: "white"
                                },
                                "& .MuiInputLabel-outlined.Mui-focused": {
                                    color: "white"
                                },
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white"
                                },
                            }}
                        />
                    </Stack>
                </Box>
            </SubmitModal>
        </>
    )
}

export default Report