import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../Styles/Weather.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
export default function Weather() {
    const apiKey = "f56f24967aaf51182d1d4df628297c6d";
    const [inputCity, setInputcity] = useState("");
    const [gradus, setGradus] = useState(false);
    const [data, setData] = useState({});
    const [hours, setHours] = useState()
    const [minut, setMinut] = useState()
    const [second, setSecond] = useState()
    const [loading, setLoading] = useState(false)
    const NewDate = () => {
        let date = new Date();
        setHours(date.getHours());
        setMinut(date.getMinutes());
        setSecond(date.getSeconds());

    }
    useEffect(() => {
        setInterval(() => {
            NewDate();
        }, 1000);
    }, [])


    const tempt = "°C";
    const getWeather = (city) => {
        if (!city) return
        setLoading(true);
        axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
        ).then(res => {
            setData(res.data)
            setLoading(false);
            console.log(res);
            toast.success('Marhamat ob-havo bilan tanishing!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }).catch(err => {
            setLoading(false)
            toast.warn("Bunday malumot mavjud emas", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
    }
    const handelChange = (e) => {
        setInputcity(e.target.value);
    }
    const handelSubmit = () => {
        getWeather(inputCity)
        setInputcity("");
        setGradus(true)

        console.log(data.length);

    }
    return (
        <div className="weather">
            <ToastContainer />
            {loading}
            <section className="" style={{ backgroundColor: '#4B515D' }}>
                <h2 className='text-center pt-5 fst-normal fs-2 text-light'>My weather app</h2>
                <div className="pt-5 d-flex  flex-wrap  justify-content-center align-items-center">
                    <input
                        className='form-control width1 me-2   text-center'
                        type="text"
                        onChange={handelChange}
                        value={inputCity}

                    />
                    <button
                        className='form-control  width2 btn ms-2 btn-warning'
                        onClick={handelSubmit}
                    >Search </button>
                </div>
                {Object.keys(data).length == 0 && (
                    <p className='text-center fst-normal mt-5 text-light fs-3'>Agar shaharni to'gri kiritsangiz bu
                        yerda ob-havo haqidagi ma'lumot bo'lishi mumkin edi</p>
                )}
                {Object.keys(data).length > 0 && (

                    <div className="container  h-100">
                        <div className="row d-flex justify-content-center  mt-5 pt-5 h-100">
                            <div className="col-md-8 col-lg-6 col-xl-4">
                                <div className="card" style={{ color: '#4B515D', borderRadius: 35 }}>
                                    <div className="card-body p-4">
                                        <div className="d-flex">
                                            <h6 className="flex-grow-1">{data.name}</h6>
                                            <h6>{hours}:{minut}:{second}</h6>
                                        </div>
                                        <div className="d-flex flex-column text-center mt-5 mb-4">
                                            <h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }}>{((data?.main?.temp) - 273).toFixed(0)}°C </h6>
                                            <span className="small" style={{ color: '#868B94' }}>Stormy</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                                                <div><i className="fas fa-wind fa-fw" style={{ color: '#868B94' }} /> <span className="ms-1"> 40 km/h
                                                </span></div>
                                                <div><i className="fas fa-tint fa-fw" style={{ color: '#868B94' }} /> <span className="ms-1"> 84% </span>
                                                </div>
                                                <div><i className="fas fa-sun fa-fw" style={{ color: '#868B94' }} /> <span className="ms-1"> 0.2h </span>
                                                </div>
                                            </div>
                                            <div>
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp" width="100px" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            {loading && <Loader />}

        </div>
    )
}
