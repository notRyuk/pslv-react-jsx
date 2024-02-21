import React, {useState, useEffect} from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import classes from "./styles.module.scss"
import { useSelector } from 'react-redux';
import urls, { basePath } from '../../../utils/urls';
import { useGetter } from '../../hooks/fetcher';
import { selectSession } from '../auth/authSlice';
import CheckIcon from '@mui/icons-material/Check';

const ConnectionType = (props) => {
    const session = useSelector(selectSession)
    const connectionsUrl = basePath + urls.connections.getByUser.replace(":user", session?.user._id)
    const suggestUrl = basePath + urls.user.suggestedUser.get
    const requestUrl = basePath + urls.request.from
    const { data: connectedUser, mutate: connectionMutate, isLoading: connectionIsLoading } = useGetter(connectionsUrl)
    const { data: connectionRequests, mutate: requestMutate, isLoading: requestIsLoading } = useGetter(requestUrl)
    const { data: suggestedUser, mutate: suggestMutate, isLoading: suggestIsLoading } = useGetter(suggestUrl)

    const [isFriend, setIsFriend] = useState(false);
    const [isSuggestion, setIsSuggestion] = useState(false);
    const [hasRequested, setHasRequested] = useState(false);
    useEffect(()=>{
        let flag1 = false;
        connectedUser?.data.forEach(eachUser => {
            if(eachUser?.users[0]._id === props.userId){
                flag1 = true;
            }
        })
        setIsFriend(flag1)
        let flag2 = false;
        suggestedUser?.data.forEach(eachUser => {
            if(eachUser?._id === props.userId){
                flag2 = true;
            }
        })
        setIsSuggestion(flag2)
        let flag3 = false;
        connectionRequests?.data.forEach(cr => {
            if(cr?.from._id === props.userId){
                flag3 = true;
            }
        })
        setHasRequested(flag3)
    }, [connectedUser, suggestedUser, connectionRequests])

  return (
        <>
            {isSuggestion && <Button variant="contained" endIcon={<PersonAddIcon />} className={classes.connectionType}>
                Connect
            </Button>}
            {isFriend && <Button variant="contained" endIcon={<CheckIcon />} className={classes.connectionType}>
                Connection
            </Button>}
            {hasRequested && <Button variant="contained" endIcon={<PersonAddIcon />} className={classes.connectionType}>
                Accept
            </Button>}
            {!isSuggestion && !isFriend && !hasRequested && <Button variant="contained" endIcon={<CheckIcon />} className={classes.connectionType}>
                Connection Sent
            </Button>}
        </>
  )
}

export default ConnectionType