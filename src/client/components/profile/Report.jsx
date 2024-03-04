// @ts-ignore
import classes from "./styles.module.scss"
import urls, { basePath } from '../../../utils/urls';
import {usePoster } from '../../hooks/fetcher';
import { toast } from 'react-toastify';

const Report = ({userId, mutate}) => {
    const reportUrl = basePath + urls.report.create

    const {data : reportedData, trigger: reportUser} = usePoster(reportUrl)

    const clickHandler = async () => {
        const res = await reportUser({
            user: userId
        })
        console.log(res);
        if (res?.status === "success") {
            mutate();
            toast.success("Reported User Successfully")
        }
        else {
            toast.error("Something went wrong!!")
        }
    }

    return (
        <button className={`${classes.report}`} onClick={clickHandler}>
            Report
        </button>
    )
}

export default Report