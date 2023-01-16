import './ReviewList.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotAllReviews } from '../../store/review';
import ReviewCard from '../ReviewCard/ReviewCard';


const ReviewList = () => {
    const {spotId} =useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const reviewsObj = useSelector(state => state.reviewState)
    const reviewsArr = Object.values(reviewsObj);





    useEffect(() => {
        dispatch(loadSpotAllReviews(spotId)).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
    <div>
        {isLoaded && reviewsArr.map(review =>
        <ReviewCard review ={review} key={review.id}/>

    )}

    </div>
    )
}

export default ReviewList;
