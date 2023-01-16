import './EditSpotForm.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { updateSpot, loadAllSpots } from '../../store/spot';


const EditSpotForm = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(loadAllSpots())
    }, [dispatch])
    const selectedSpot = useSelector(state => state.spotState[parseInt(spotId)])
    useEffect(() => {
        setName(selectedSpot?.name)
        setAddress(selectedSpot?.address)
        setCity(selectedSpot?.city)
        setState(selectedSpot?.state)
        setCountry(selectedSpot?.country)
        setLat(selectedSpot?.lat)
        setLng(selectedSpot?.lng)
        setPreviewImage(selectedSpot?.previewImage)
        setPrice(selectedSpot?.price)
        setDescription(selectedSpot?.description)
    }, [selectedSpot])


// console.log('this maybe?', selectedSpot)

    const [name, setName] = useState(selectedSpot?.name)
    const [address, setAddress] = useState(selectedSpot?.address)
    const [city, setCity] = useState(selectedSpot?.city)
    const [state, setState] = useState(selectedSpot?.state)
    const [country, setCountry] = useState(selectedSpot?.country)
    const [lat, setLat] = useState(selectedSpot?.lat)
    const [lng, setLng] = useState(selectedSpot?.lng)
    const [previewImage, setPreviewImage] = useState(selectedSpot?.previewImage)
    const [price, setPrice] = useState(selectedSpot?.price)
    const [description, setDescription] = useState(selectedSpot?.description)
    const [errors, setErrors] = useState([])



    const submitHandler = (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            id:parseInt(spotId),
            ownerId:sessionUser.id,
            name,
            address,
            city,
            state,
            country,
            lat,
            lng,
            previewImage,
            price,
            description

        }

console.log('payload:',payload)

        dispatch(updateSpot(payload)).then(() => history.push(`/${selectedSpot.id}`))
        .catch(async res => {
            const data = await res.json()
            if(data.errors) return setErrors(data.errors)
        })
    }


    return sessionUser ? (
        <div className='create_edit-page'>
            {errors.length > 0 && errors.map((error, i) =>
                (<li key={i}>{error}</li>))}
            <form onSubmit={submitHandler}>
                <label>Name:</label>
                <input className='create_edit_form-items'
                value={name}
                onChange={(e) => setName(e.target.value)}/>

                <label>Address:</label>
                <input className='create_edit_form-items'
                value={address}
                onChange={(e) => setAddress(e.target.value)}/>

                <label>City:</label>
                <input className='create_edit_form-items'
                value={city}
                onChange={(e) => setCity(e.target.value)}/>

                <label>State:</label>
                <input className='create_edit_form-items'
                value={state}
                onChange={(e) => setState(e.target.value)}/>

                <label>County:</label>
                <input className='create_edit_form-items'
                value={country}
                onChange={(e) => setCountry(e.target.value)}/>

                <label>Latitude:</label>
                <input className='create_edit_form-items'
                value={lat}
                onChange={(e) => setLat(e.target.value)}/>

                <label>Longitude:</label>
                <input className='create_edit_form-items'
                value={lng}
                onChange={(e) => setLng(e.target.value)}/>

                <label>Image:</label>
                <input className='create_edit_form-items'
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}/>

                <label>Price:</label>
                <input className='create_edit_form-items'
                value={price}
                onChange={(e) => setPrice(e.target.value)}/>

                <label>Description:</label>
                <input className='create_edit_form-items'
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>

                <button className='button'>Submit</button>

            </form>
        </div>
    ) :
    <div>You must be logged in to edit a spot.  Click the Home link to return to the homepage</div>
}

export default EditSpotForm;
