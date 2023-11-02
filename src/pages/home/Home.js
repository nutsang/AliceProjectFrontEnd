import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import MediaCard from '../../components/media-card/MediaCard'
import { useSelector } from 'react-redux'

const Home = () => {
  const [media, setMedia] = useState([])
  const [mediaPreference, setMediaPreference] = useState([])
  const [errorOnce, setErrorOnce] = useState(false)
  const isLogin = useSelector((state) => state.isLogin.isLogin)
    useEffect(()=>{
      if(media.length <= 0){
        axios.get(`${process.env.REACT_APP_API}/`)
        .then((response) => {
          setMedia(response.data)
        })
        .catch((error) => {
          if(!errorOnce){
            Swal.fire({
              title: 'เกิดข้อผิดพลาด',
              text: error.code === 'ERR_NETWORK' ? 'เซิฟเวอร์กำลังปรับปรุง...' : error.response.data.message,
              icon: 'error',
              confirmButtonText: 'ตกลง'
            })
            setErrorOnce(true)
          }
        })
      }
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
    }, [isLogin, errorOnce, media.length])
  return (
    <>
    <MetaHeader title={`หน้าแรก`} />
    <Navigation />
    <div className='container mx-auto p-10'>
      <h1 className='text-4xl mt-10 mb-5'>ยอดนิยม</h1>
      <div className='grid place-content-center grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-5 md:gap-7'>
        {(((media.length > 0) && !errorOnce) && isLogin) ?
        media.map((media) => <MediaCard key={media.id} media={media} mediaPreference={mediaPreference} setMediaPreference={setMediaPreference}/>) : 
        media.map((media) => <MediaCard key={media.id} media={media} />)}
      </div>
    </div>
    </>
  )
}

export default Home