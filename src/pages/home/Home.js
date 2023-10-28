import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react'
import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import MediaCard from '../../components/media-card/MediaCard';

const Home = () => {
  const [media, setMedia] = useState([])
  const [errorOnce, setErrorOnce] = useState(false)
    useEffect(()=>{
      if(media.length <= 0){
        axios.get(`${process.env.REACT_APP_API}/`)
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
      }
    }, [])
  
  return (
    <>
    <MetaHeader title={`หน้าแรก`} />
    <Navigation />
    <div className='container mx-auto'>
      <h1 className='text-4xl mt-10 mb-5'>ยอดนิยม</h1>
      <div className='grid place-content-center grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-5 md:gap-7'>
        {media.length > 0 && media.map((media) => <MediaCard key={media.id} media={media} />)}
      </div>
    </div>
    </>
  )
}

export default Home