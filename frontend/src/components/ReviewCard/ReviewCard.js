import './ReviewCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteReview } from '../../store/review'

const ReviewCard = ({ review }) => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    // const userHold = useSelector(state => state.spotState)
    // const user = userHold[spotId].Owner

    // let isOwner;

if(sessionUser){
     var isOwner = sessionUser.id === review.userId

}

// console.log('reviewOwner Id:', review.userId)
// console.log('sessionId:',sessionUser.id)

    const deleteHandler = () => {
        dispatch(deleteReview(review.id))

    }
    return (
        <div className="reviewCard">
            <div>{review.review}</div>
            <div>{review.stars} stars</div>
            <div>By {review.User.firstName} {review.User.lastName}</div>
            {isOwner && <button onClick={deleteHandler} className='reviewCard-button'>Delete</button>}
        </div>
    )
}

export default ReviewCard
