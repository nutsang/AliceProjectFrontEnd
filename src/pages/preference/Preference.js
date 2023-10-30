import axios from 'axios'
import Swal from 'sweetalert2'
import PreferenceCard from '../../components/preference-card/PreferenceCard'
import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Preference = () => {
  const [media, setMedia] = useState([])
  const [errorOnce, setErrorOnce] = useState(false)
  const isLogin = useSelector((state) => state.isLogin.isLogin)
  const navigate = useNavigate()
  useEffect(()=>{
    !isLogin && navigate('/')
  }, [isLogin, navigate])

  useEffect(()=>{
      const token = localStorage.getItem('token')
      axios.get(`${process.env.REACT_APP_API}/preference`, {headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then((response) => {
        setMedia(response.data)
      })
      .catch((error) => {
        if(errorOnce){
          Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: error.code === 'ERR_NETWORK' ? 'เซิฟเวอร์กำลังปรับปรุง...' : error.response.data.message,
            icon: 'error',
            confirmButtonText: 'ตกลง'
          })
          setErrorOnce(true)
        }
      })
  }, [errorOnce, media.length])

  return (
    <>
    <MetaHeader title={`รายการโปรด`} />
    <Navigation />
    <div className='container mx-auto p-10'>
      <h1 className='text-4xl mt-10 mb-5'>รายการโปรด</h1>
      <div className='grid place-content-center grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-5 md:gap-7'>
        {media.length > 0 && !errorOnce && media.map((item) => <PreferenceCard key={item.id} media={item} mediaPreference={media} setMedia={setMedia} />)}
      </div>
    </div>
    </>
  )
}
  
export default Preference