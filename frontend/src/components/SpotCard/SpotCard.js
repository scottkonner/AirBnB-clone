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
            <div className='spotCard-Pic'>
                <img  src={spot.previewImage} alt='not loading'></img>
            </div>
            <div className='spotCard-Name'>{spot.name}</div>
            <div className='spotCard-Location'>{spot.city},{spot.state}</div>
            <div className='spotCard-Price'>${spot.price} per night</div>
            <div className='spotCard-buttonBlock'>
                <button className='button'onClick={event => window.location.href=`/${spot.id}`}>Details</button>
                {isOwner && <button className='button' onClick={event => window.location.href=`/editspot/${spot.id}`}>Edit</button>}
                {isOwner && <button className='button' onClick={deleteHandler}>Delete</button>}
            </div>
        </div>
    )
}

export default SpotCard
