import { TabPanel } from "@mui/lab"
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { selectLoggedInUser } from "@client/components/auth/authSlice"
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Institute from "@client/components/institute";
import NewsCard from "../../../components/cards/newsCard";
import AlumniRequest from "../../../components/alumni-request";
import AdminPost from "../../../components/posts/admin-posts";
import AdminUserUpdate from "../../../components/updateByAdmin";
import ReportedUser from "../../../components/reported-user";
import ReportedPost from "@client/components/posts/reported-post";

const panels = {
    "Institutes": <Institute />,
    "Alumni Approval": <AlumniRequest></AlumniRequest>,
    "Update News": <NewsCard></NewsCard>,
    "Manage Users": <AdminUserUpdate></AdminUserUpdate>,
    "Reported Users": <ReportedUser></ReportedUser>,
    "Reported Posts": <ReportedPost></ReportedPost>
}

export default function Page() {
    
    const [value, setValue] = useState(Object.keys(panels)[0])
    const handleChangeValue = (_, _new) => setValue(_new)
    const user = useSelector(selectLoggedInUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!Object.keys(user).includes("admin")) {
            navigate("/home")
        }
    }, [user])

    return (
        <Box sx={{ width: '100%', typography: 'h2', marginTop: "4.5rem" }}>
            {/* <Paper 
                sx={{
                    width: "100%", 
                    typography: 'h2', 
                    padding: "1rem"
                }}
            >
                <Typography variant="h4">Admin Dashboard</Typography>
            </Paper> */}
            <TabContext value={value}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: "center",
                    }}
                >
                    <TabList
                        onChange={handleChangeValue}
                        sx={{
                            gap: "1rem",
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "1rem"
                        }}
                    >
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

// export const layout = {
//     hasFooter: false,
//     hasHeader: false
// }