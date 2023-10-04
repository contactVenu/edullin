import { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { BiSearch, BiUserCircle, BiMap } from "react-icons/bi"

export default function Header({ location, setLocation }) {

    const [searchTerm, setSearchTerm] = useState('')
    const [places, setPlaces] = useState([])

    const selectLocation = (item) => {
        setLocation(item)
        setSearchTerm('')
    }

    useEffect(() => {
        axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=5&language=en&format=json`)
            .then(res => setPlaces(res.data?.results))
            .catch(err => console.error(err))
    }, [searchTerm])

    return (
        <div className="w-100 p-2 d-flex justify-content-between border-bottom">
            <div className="d-flex">
                <Form.Control size="sm" type="text" className="position-relative" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <span className="text-primary bg-light"><BiSearch className="h4" /></span>
                <div className="position-absolute bg-white" style={{ zIndex: '1', boxShadow: '0px 0px 10px grey', margin: '40px 20px' }}>
                    {places && places.length > 0 &&
                        places.map((item, index) => <span key={index} className="mt-2 d-block" onClick={() => { selectLocation(item) }} style={{ cursor: "pointer" }}>
                            <BiMap className="mx-1" />{item.name}
                        </span>)}
                </div>
            </div>
            <div className="d-flex">
                <span className="d-flex mx-5 h6">Name :{location.name}</span>
                <span className="d-flex mx-5 h6">Latitude :{location.latitude}</span>
                <span className="d-flex mx-5 h6">Longitude :{location.longitude}</span>
            </div>
            <div className="d-flex align-items-center">
                <BiUserCircle className="h4" />
                <h5>Login</h5>
            </div>
        </div>
    )
}