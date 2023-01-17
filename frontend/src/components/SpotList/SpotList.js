import './SpotList.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllSpots } from '../../store/spot';
import SpotCard from '../SpotCard/SpotCard';


const SpotList = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const spotsObj = useSelector(state => state.spotState)
    const spotsArr = Object.values(spotsObj);


    useEffect(() => {
        dispatch(loadAllSpots()).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
    <div className='spotList'>
        {spotsArr.map(spot =>
        <SpotCard  spot ={spot}/>
        )}
    </div>
    )
}

export default SpotList;
