import { RiHeart3Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import PreferenceButton from '../preference-button/PreferenceButton'
import { useEffect, useState } from 'react'
import axios from 'axios'

const InformationCard = ({id, cover_photo, title, dubbed, subtitle, synopsis, popularity, episode_amount, mediaPreference, setMediaPreference}) => {
    const darkMode = useSelector((state) => state.switchMode.darkMode)
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const [rating, setRating] = useState(0)
    const [popularityRating, setPopularityRating] = useState(popularity)
    const [genre, setGenre] = useState([])
    const preferenceModal = (event) => {
        isLogin ? document.getElementById(`isSignIn-${id}`).showModal() : document.getElementById(`isSignOut-${id}`).showModal()
        event.preventDefault()
    }

    const ratingChange = (selectedRating) => {
        if(isLogin){
            if((selectedRating === 1 && rating === 1) || rating === selectedRating){
                const token = localStorage.getItem('token')
                axios.post(`${process.env.REACT_APP_API}/popularity/${id}`, {point: 0}, {headers: {
                  'Authorization': `Bearer ${token}`
                }})
                .then((response) => {
                    if(response.data.status){
                        setRating(response.data.result[0].point)
                    }
                })
                .catch((error) => {})
                setPopularityRating(popularityRating - rating)
                setRating(0)
            }else if(selectedRating !== rating){
                const token = localStorage.getItem('token')
                axios.post(`${process.env.REACT_APP_API}/popularity/${id}`, {point: selectedRating}, {headers: {
                  'Authorization': `Bearer ${token}`
                }})
                .then((response) => {
                    if(response.data.status){
                        setRating(response.data.result[0].point)
                    }
                })
                .catch((error) => {})
                setPopularityRating(popularityRating - rating + selectedRating)
                setRating(selectedRating)
            }
        }else{
            document.getElementById(`isSignOut-${id}`).showModal()
        }
      };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/genre/${id}/`)
        .then((response) => {
            if(response.data.status){
                const genres = response.data.genre.map(item => item.genre)
                const formattedGenres = genres.join(' | ')
                setGenre(formattedGenres)
            }
        })
        .catch((error) => {})
        if(isLogin){
            const token = localStorage.getItem('token')
            axios.get(`${process.env.REACT_APP_API}/popularity/${id}`, {headers: {
              'Authorization': `Bearer ${token}`
            }})
            .then((response) => {
                if(response.data.status){
                    setRating(response.data.result[0].point)
                }
            })
            .catch((error) => {})
        }
    },[isLogin])

    return (<>
    <PreferenceButton media_id={id} mediaPreference={mediaPreference} setMediaPreference={setMediaPreference}/>
    <div className={`card card-side shadow-xl ${darkMode ? "glass" : "bg-gray-200"}`}>
        <figure className='lg:w-96 relative hidden lg:flex'>
            <img className='object-fill w-full h-full hidden lg:flex' src={cover_photo ? require(`../../asset/cover-photo/${cover_photo}`) : ''} alt={title}/>
            {!mediaPreference.includes(id) && <button className='absolute top-2 left-2 btn btn-circle btn-primary hidden lg:flex' title='เพิ่มรายการโปรด' onClick={preferenceModal}><RiHeart3Line size={32}/></button>}
        </figure>
        <div className='w-100 lg:w-4 card-body'>
            <h2 className='card-title'>{title} {episode_amount < 1 ? 'ยังไม่มีตอน' : `มีทั้งหมด ${episode_amount} ตอน`}</h2>
            <span className='hidden lg:flex'>เนื้อเรื่องย่อ</span>
            <span className='hidden lg:flex'>{synopsis}</span>
            <span>หมวดหมู่: {subtitle !== 'ไม่มี' && (<div className='badge badge-primary p-3'>ซับ{subtitle}</div>)} {dubbed !== 'ไม่มี' && (<div className='badge badge-primary p-3'>พากย์{dubbed}</div>)}</span>
            <span>ประเภท: {genre.length < 1 ? `ไม่มี`: genre}</span>
            <span>คะแนนรวม: {popularityRating}</span>
            <span className='rating'>
                <input type='radio' name='rating' className='hidden rating-hidden' checked={0 === rating} />
                {[1, 2, 3, 4, 5].map((star) => 
                    <input type='radio' name='rating' className='mask mask-star-2 bg-orange-400' key={star} onClick={() => ratingChange(star)} checked={star === rating} />
                )}
            </span>
            <span>คะแนนที่คุณโหวต: {rating}</span>
            <div className='absolute top-2 right-2 btn btn-circle btn-primary lg:hidden' title='เพิ่มรายการโปรด' onClick={(event)=>{event.preventDefault()}}><RiHeart3Line size={32}/></div>
        </div>
    </div>
    </>)
}

export default InformationCard