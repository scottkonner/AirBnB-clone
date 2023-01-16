import './SpotCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSpot } from '../../store/spot'

const SpotCard = ({ spot }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    // let isOwner;

if(sessionUser){
     var isOwner = sessionUser.id === spot.ownerId
}




    const deleteHandler = () => {
        dispatch(deleteSpot(spot.id))
    }
    return (
        <div className="spotCard">
            <img className='spotPic' src={spot.previewImage} alt='not loading'></img>
            <div>{spot.name}, located in {spot.city},{spot.state}</div>
            <div>${spot.price} per night</div>
            <button onClick={event => window.location.href=`/${spot.id}`}>Details</button>
            {isOwner && <button onClick={event => window.location.href=`/editspot/${spot.id}`}>Edit</button>}
            {isOwner && <button onClick={deleteHandler}>Delete</button>}
            </div>
    )
}

export default SpotCard
