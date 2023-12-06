import { TabPanel } from "@mui/lab"
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import { useSelector } from "react-redux"
import { selectLoggedInUser } from "@client/components/auth/authSlice"
import { Box, Paper, Typography } from "@mui/material";

const panels = {
    "Institutes": <></>,
    "Alumni Approval": <></>,
    "Update News": <></>
}

export default function Page() {
    const [value, setValue] = useState(Object.keys(panels)[0])
    const handleChangeValue = (_, _new) => setValue(_new)

    const user = useSelector(selectLoggedInUser)

    return (
        <Box sx={{width: '100%', typography: 'h2'}}>
            <Paper 
                sx={{
                    width: "100%", 
                    typography: 'h2', 
                    padding: "1rem"
                }}
            >
                <Typography variant="h4">Admin Dashboard</Typography>
            </Paper>
            <TabContext value={value}>
                <Box 
                    sx={{ 
                        borderBottom: 1, 
                        borderColor: 'divider', 
                        display: 'flex', 
                        justifyContent: "center" 
                    }}
                >
                    <TabList onChange={handleChangeValue}>
                        {Object.keys(panels).map(e => (
                            <Tab key={e} label={e} value={e} />
                        ))}
                    </TabList>
                </Box>
                {Object.keys(panels).map(e => (
                    <TabPanel 
                        key={e} 
                        value={e}
                        
                    >
                        {panels[e]}
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    )
}

export const layout = {
    hasFooter: false,
    hasHeader: false
}