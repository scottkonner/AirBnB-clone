import './DetailedSpot.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loadDetailedSpot, deleteSpot, } from '../../store/spot';
import { loadSpotAllReviews } from '../../store/review';
import ReviewList from '../ReviewList/ReviewList';

const DetailedSpot = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showButton, setShowButton] = useState(true)
    let history = useHistory()

    const dispatch = useDispatch()
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)

    const spotsObj = useSelector(state => state.spotState)
    const detailedSpot = spotsObj[spotId];
    useEffect(() => {
        dispatch(loadDetailedSpot(spotId))
        .then(() => dispatch(loadSpotAllReviews(spotId)))
        .then(() => setIsLoaded(true))


    }, [dispatch ])

    const reviewsObj = useSelector(state => state.reviewState)
    const reviewsArr = Object.values(reviewsObj);
    // const findTheReview = reviewsArr.find(review => review.userId === sessionUser.id)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    console.log('look @ DetailedSpot:', )

    // let isOwner;

    if (sessionUser && detailedSpot && spotsObj) {
        var isOwner = sessionUser.id === detailedSpot.ownerId
        var findTheReview = reviewsArr.find(review => review.userId === sessionUser.id)
    }

    const deleteHandler = () => {
        dispatch(deleteSpot(detailedSpot.id))
        history.push('/profile')
    }

    return isLoaded ? (
        <div >
            <img src={detailedSpot.previewImage} alt='not loading'></img>
            <div>{detailedSpot.name}, located in {detailedSpot.city},{detailedSpot.state}, {detailedSpot.country}</div>
            <div>${detailedSpot.price} per night</div>
            <div>Star Rating:{detailedSpot.avgStarRating}</div>
            <div>Latitude:{detailedSpot.lat}</div>
            <div>Longitude:{detailedSpot.lng}</div>

            <div>About: {detailedSpot.description}</div>
            <div>Joined AirBnb on {detailedSpot.createdAt}</div>

            <button onClick={openMenu}>
                Reviews
            </button>
            {(!isOwner && !findTheReview) && <button onClick={event => window.location.href = `/${spotId}/createreview`}>Leave a review</button>}
            {showMenu && (
                <div className="profile-dropdown">
                    <ReviewList/>

                </div>
            )}


            {isOwner && <button onClick={event => window.location.href = `/editspot/${spotId}`}>Edit</button>}
            {isOwner && <button onClick={deleteHandler}>Delete</button>}
        </div>
    ) : null
}

export default DetailedSpot
