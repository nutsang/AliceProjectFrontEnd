import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { useSelector } from 'react-redux'
import { RiFilter3Line } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import MediaCard from '../../components/media-card/MediaCard'
import FilterButton from '../../components/filter-button/FilterButton'

const Search = () => {
  const darkMode = useSelector((state) => state.switchMode.darkMode)
  const [search, setSearch] = useState('')
  const [filterShow, setFilterShow] = useState(false)
  const [filterMedia, setFilterMedia] = useState([
    ['แอ็กชัน', false],
    ['เพลง', false],
    ['หนุ่มน้อย', false],
    ['ผจญภัย', false],
    ['โรแมนติก', false],
    ['ชีวิตประจำวัน', false],
    ['คอมเมดี้', false],
    ['วิทยาศาสตร์และเทคโนโลยี', false],
    ['กีฬา', false],
    ['ดราม่า', false],
    ['เซเน็ง', false],
    ['เหนือธรรมชาติ', false],
    ['แฟนตาซี', false],
    ['โชโจะ', false],
    ['ระทึกขวัญ', false]
  ])
  const [media, setMedia] = useState([])
  const [mediaResult, setMediaResult] = useState([])
  const [mediaPreference, setMediaPreference] = useState([])
  const [errorOnce, setErrorOnce] = useState(false)
  const isLogin = useSelector((state) => state.isLogin.isLogin)

  const handleSearchMedia = (event) => {
    event.preventDefault()
    setMediaResult(media.filter(item => item.title.toLowerCase().includes(search.toLowerCase())))//search.toLowerCase()
  }
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
    <MetaHeader title={`ค้นหาข้อมูล`} />
    <Navigation />
    <div className='container mx-auto p-10'>
        <div className='join hidden sm:flex'>
          <input value={search} onChange={(event) => setSearch(event.target.value)} onKeyUp={handleSearchMedia} type="text" placeholder="ค้นหา..." className={`${darkMode ? "bg-gray-200" : "bg-gray-200"} text-primary input input-bordered w-4/5 text-xl font-black join-item`} />
          <button onClick={() => setFilterShow(!filterShow)} className='btn btn-square btn-primary w-1/5 text-xl font-black join-item'><RiFilter3Line className='hidden lg:flex' size={32} /> กรองข้อมูล</button>
        </div>
        <input value={search} onChange={(event) => setSearch(event.target.value)} onKeyUp={handleSearchMedia} type="text" placeholder="ค้นหา..." className={`${darkMode ? "bg-gray-200" : "bg-gray-200"} text-primary input input-bordered w-full text-xl font-black mb-3 sm:hidden`} />
        <button onClick={() => setFilterShow(!filterShow)} className='btn btn-square btn-primary w-full text-xl font-black sm:hidden'>กรองข้อมูล</button>
    </div>

    <div className={`${!filterShow && 'hidden'} container mx-auto px-10`}>
      <div className={`p-5 rounded grid place-content-center grid-cols-2  md:grid-cols-5 gap-2.5 md:gap-7 ${darkMode ? "bg-white" : "bg-gray-200"}`}>
        {filterMedia.map((item, index) => 
          <button
          key={index}
          onClick={() => {
            const newFilterMedia = [...filterMedia];
            newFilterMedia[index][1] = !item[1];
            setFilterMedia(newFilterMedia);
          }}
          className={`btn btn-square ${!item[1] && 'btn-outline'} btn-primary w-full text-xl font-black`}
          >
            {item[0]}
          </button>
        )}
      </div>
    </div>



    {search === '' ? (
      <div className='container mx-auto px-10'>
        <h1 className='text-4xl mt-10 mb-5'>ผลการค้นหา ทั้งหมด</h1>
        <div className='grid place-content-center grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-5 md:gap-7'>
          {(((media.length > 0) && !errorOnce) && isLogin) ?
          media.map((media) => <MediaCard key={media.id} media={media} mediaPreference={mediaPreference} setMediaPreference={setMediaPreference}/>) : 
          media.map((media) => <MediaCard key={media.id} media={media} />)}
        </div>
      </div>
    ) : (
      <div className='container mx-auto px-10'>
        <h1 className='text-4xl mt-10 mb-5'>ผลการค้นหา {search}</h1>
        <div className='grid place-content-center grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-5 md:gap-7'>
          {(((mediaResult.length > 0) && !errorOnce) && isLogin) ?
          mediaResult.map((media) => <MediaCard key={media.id} media={media} mediaPreference={mediaPreference} setMediaPreference={setMediaPreference}/>) : 
          mediaResult.map((media) => <MediaCard key={media.id} media={media} />)}
        </div>
      </div>
    )}
    </>
  )
}
  
export default Search