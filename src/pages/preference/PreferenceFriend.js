import axios from 'axios'
import Swal from 'sweetalert2'
import MediaCard from '../../components/media-card/MediaCard'
import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const PreferenceFriend = () => {
  const { friend_id } = useParams()
  const [media, setMedia] = useState([])
  const [friendUsername, setFriendUsername] = useState('')
  const [mediaPreference, setMediaPreference] = useState([])
  const [errorOnce, setErrorOnce] = useState(false)
  const isLogin = useSelector((state) => state.isLogin.isLogin)
  const navigate = useNavigate()

  useEffect(()=>{
    !isLogin && navigate('/')
  }, [isLogin, navigate])
  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.post(`${process.env.REACT_APP_API}/get-friend/`, {friend_id}, {
      headers: {
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
      setFriendUsername(response.data.result[0].username)
    })
  }, [friend_id])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`${process.env.REACT_APP_API}/preference-friend/${friend_id}`, {
        headers: {
        'Authorization': `Bearer ${token}`
      }})
    .then((response) => {
      setMedia(response.data)
    })
    .catch((error) => {
      if (errorOnce) {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: error.code === 'ERR_NETWORK' ? 'เซิฟเวอร์กำลังปรับปรุง...' : error.response.data.message,
          icon: 'error',
          confirmButtonText: 'ตกลง'
        })
        setErrorOnce(true)
      }
    })
    if(isLogin){
      const token = localStorage.getItem('token')
      axios.get(`${process.env.REACT_APP_API}/preference`, {headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then((response) => {
        setMediaPreference(response.data.map(item => item.id))
      })
      .catch((error) => {})
  }
  }, [errorOnce, media.length, friend_id, isLogin])
  

  return (
    <>
    <MetaHeader title={`รายการโปรด`} />
    <Navigation />
    <div className='container mx-auto p-10'>
      <h1 className='text-4xl mt-10 mb-5'>รายการโปรด ของ {friendUsername}</h1>
      <div className='grid place-content-center grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-5 md:gap-7'>
        {media.length > 0 && !errorOnce && media.map((media) => <MediaCard key={media.id} media={media} mediaPreference={mediaPreference} setMediaPreference={setMediaPreference}/>)}
      </div>
    </div>
    </>
  )
}
  
export default PreferenceFriend