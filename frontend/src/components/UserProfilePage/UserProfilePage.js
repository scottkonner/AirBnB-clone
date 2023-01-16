import './UserProfilePage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserSpots } from '../../store/spot';
import SpotCard from '../SpotCard/SpotCard';


const UserProfilePage = ({user}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const spotsObj = useSelector(state => state.spotState)
const spotsArr = Object.values(spotsObj);



    useEffect(() => {
        dispatch(loadUserSpots()).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
    <div>
        <button
        onClick={event => window.location.href='/createspot'}>Add a new Spot!
        </button>
        <div>
        {spotsArr.map(spot =>
        <SpotCard spot ={spot}/>
        )}
        </div>


    </div>
    )
}

export default UserProfilePage;
