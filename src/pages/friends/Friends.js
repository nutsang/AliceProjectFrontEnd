import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Friends = () => {
  const isLogin = useSelector((state) => state.isLogin.isLogin)
  const darkMode = useSelector((state) => state.switchMode.darkMode)
  const [search, setSearch] = useState('')
  const [searchFriendStatus, setSearchFriendStatus] = useState(false)
  const [requestFriendStatus, setRequestFriendStatus] = useState(false)
  const [friendListStatus, setFriendListStatus] = useState(true)
  const navigate = useNavigate()
  useEffect(()=>{
    !isLogin && navigate('/')
  }, [isLogin, navigate])

  const handleTabStatus = (status) => {
    setFriendListStatus(status === 0)
    setRequestFriendStatus(status === 1)
    setSearchFriendStatus(status === 2)
  }

  const handleSearchMedia = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  return (
    <>
    <MetaHeader title={`เพื่อน`} />
    <Navigation />
    <div className={`container mx-auto pt-10 pb-5 px-10`}>
    <div class={`${darkMode ? "bg-gray-200" : "bg-gray-200"} tabs w-full p-5 rounded-md`}>
      <Link to='#' onClick={()=>{handleTabStatus(0)}} class={`tab tab-bordered w-1/3 hover:border-rose-300 text-black font-black text-xl ${friendListStatus && 'border-primary'}`}>เพื่อน</Link> 
      <Link to='#' onClick={()=>{handleTabStatus(1)}} class={`tab tab-bordered w-1/3 hover:border-rose-300 text-black font-black text-xl ${requestFriendStatus && 'border-primary'}`}>คำขอเป็นเพื่อน</Link> 
      <Link to='#' onClick={()=>{handleTabStatus(2)}} class={`tab tab-bordered w-1/3 hover:border-rose-300 text-black font-black text-xl ${searchFriendStatus && 'border-primary'}`}>ค้นหาเพื่อน</Link>
    </div>
    </div>

    <div className={`${!friendListStatus && 'hidden'}`}>
      <div className={`container mx-auto px-10`}>
        <div className={`rounded grid place-content-center grid-cols-3 gap-3`}>

          <div class="card w-full shadow-xl">
            <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
              <h2 class="card-title">Pim Kalasinmongkol</h2>
              <div className='flex'>
                <button class="flex-1 btn btn-outline btn-primary m-1">เลิกเป็นเพื่อน</button>
                <button class="flex-1 btn text-white btn-info m-1">รายการโปรด</button>
              </div>
            </div>
          </div>

          <div class="card w-full shadow-xl">
            <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
              <h2 class="card-title">Pim Kalasinmongkol</h2>
              <div className='flex'>
                <button class="flex-1 btn btn-outline btn-primary m-1">เลิกเป็นเพื่อน</button>
                <button class="flex-1 btn text-white btn-info m-1">รายการโปรด</button>
              </div>
            </div>
          </div>

          <div class="card w-full shadow-xl">
            <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
              <h2 class="card-title">Pim Kalasinmongkol</h2>
              <div className='flex'>
                <button class="flex-1 btn btn-outline btn-primary m-1">เลิกเป็นเพื่อน</button>
                <button class="flex-1 btn text-white btn-info m-1">รายการโปรด</button>
              </div>
            </div>
          </div>

          <div class="card w-full shadow-xl">
            <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
              <h2 class="card-title">Pim Kalasinmongkol</h2>
              <div className='flex'>
                <button class="flex-1 btn btn-outline btn-primary m-1">เลิกเป็นเพื่อน</button>
                <button class="flex-1 btn text-white btn-info m-1">รายการโปรด</button>
              </div>
            </div>
          </div>

          </div>
      </div>
    </div>

    <div className={`${!requestFriendStatus && 'hidden'}`}>
      <div className={`container mx-auto px-10`}>
        <div className={`rounded grid place-content-center grid-cols-3 gap-3`}>

          <div class="card w-full shadow-xl">
            <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
              <h2 class="card-title">Pim Kalasinmongkol</h2>
              <div className='flex'>
                <button class="flex-1 btn btn-outline btn-primary m-1">ไม่สนใจ</button>
                <button class="flex-1 btn btn-primary m-1">ยอมรับ</button>
              </div>
            </div>
          </div>

          <div class="card w-full shadow-xl">
            <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
              <h2 class="card-title">Pim Kalasinmongkol</h2>
              <div className='flex'>
                <button class="flex-1 btn btn-outline btn-primary m-1">ไม่สนใจ</button>
                <button class="flex-1 btn btn-primary m-1">ยอมรับ</button>
              </div>
            </div>
          </div>

          <div class="card w-full shadow-xl">
            <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
              <h2 class="card-title">Pim Kalasinmongkol</h2>
              <div className='flex'>
                <button class="flex-1 btn btn-outline btn-primary m-1">ไม่สนใจ</button>
                <button class="flex-1 btn btn-primary m-1">ยอมรับ</button>
              </div>
            </div>
          </div>

          <div class="card w-full shadow-xl">
            <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
              <h2 class="card-title">Pim Kalasinmongkol</h2>
              <div className='flex'>
                <button class="flex-1 btn btn-outline btn-primary m-1">ไม่สนใจ</button>
                <button class="flex-1 btn btn-primary m-1">ยอมรับ</button>
              </div>
            </div>
          </div>

          </div>
      </div>
    </div>

    <div className={`${!searchFriendStatus && 'hidden'}`}>
      <div className='container mx-auto py-5 px-10'>
          <input value={search} onChange={(event) => setSearch(event.target.value)} onKeyUp={handleSearchMedia} type="text" placeholder="ค้นหาเพื่อนด้วยนามแฝง..." className={`${darkMode ? "bg-gray-200" : "bg-gray-200"} text-primary input input-bordered w-full text-xl font-black mb-3`} />
      </div>

      <div className={`container mx-auto px-10`}>
        <div className={`rounded grid place-content-center grid-cols-3 gap-3`}>
        <div class="card w-full shadow-xl">
          <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
            <h2 class="card-title">Pim Kalasinmongkol</h2>
            <button class="btn btn-outline btn-primary">เพิ่มเพื่อน</button>
          </div>
        </div>

        <div class="card w-full shadow-xl">
          <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
            <h2 class="card-title">Pim Kalasinmongkol</h2>
            <button class="btn btn-outline btn-primary">เพิ่มเพื่อน</button>
          </div>
        </div>

        <div class="card w-full shadow-xl">
          <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
            <h2 class="card-title">Pim Kalasinmongkol</h2>
            <button class="btn btn-outline btn-primary">เพิ่มเพื่อน</button>
          </div>
        </div>
        <div class="card w-full shadow-xl">
          <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
            <h2 class="card-title">Pim Kalasinmongkol</h2>
            <button class="btn btn-outline btn-primary">เพิ่มเพื่อน</button>
          </div>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}
  
export default Friends