import './CreateReviewForm.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addNewReview } from '../../store/review';

const CreateReviewForm = () => {
    const {spotId} = useParams()
    let history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [errors, setErrors] = useState([])



    const submitReviewHandler = (e) => {
        e.preventDefault()
        setErrors([])

        const reviewPayload = {
            userId:sessionUser.id,
            spotId: number,
            review,
            stars: parseInt(stars)

        }
        dispatch(addNewReview(reviewPayload, sessionUser)).then(() => history.push(`/${spotId}`))
        .catch(async res => {
            const data = await res.json()
            console.log('inside the .catch:',data.errors)
            if(data.errors) return setErrors(data.errors)

        })
    }
// console.log('sessionUser Name:', sessionUser.username)
const number = parseInt(spotId)
    console.log('This is what you"re looking for:',spotId)
    return sessionUser ? (
        <div className='create_edit-page'>
            {errors.length > 0 && errors.map((error, i) =>
                (<li key={i}>{error}</li>))}
            <form onSubmit={submitReviewHandler}>
                <label>Review:</label>
                <input className='create_edit_form-items'
                value={review}
                onChange={(e) => setReview(e.target.value)}/>

                <label>Stars(1 - 5):</label>
                <input className='create_edit_form-items'
                value={stars}
                onChange={(e) => setStars(e.target.value)}/>



                <button className='button'>Submit</button>

            </form>
        </div>
    ) :
    <div>You must be logged in to leave a review.  Click the Home link to return to the homepage</div>
}

export default CreateReviewForm;
