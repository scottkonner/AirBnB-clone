import './CreateSpotForm.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addNewSpot } from '../../store/spot';

const CreateSpotForm = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    let history = useHistory()

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [previewImage, setPreviewImage] = useState("")
    const [price, setPrice] = useState(0.00)
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([])


    const submitHandler = (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
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

        dispatch(addNewSpot(payload)).then(() => history.push('/profile'))
        .catch(async res => {
            const data = await res.json()
            console.log('inside the .catch:',data.errors)
            if(data.errors) return setErrors(data.errors)

        })
    }


    // console.log('This is what you"re looking for:',sessionUser.id)

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
    <div>You must be logged in to create a spot.  Click the Home link to return to the homepage</div>
}

export default CreateSpotForm;
