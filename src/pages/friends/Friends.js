import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Friends = () => {
  const isLogin = useSelector((state) => state.isLogin.isLogin)
  const darkMode = useSelector((state) => state.switchMode.darkMode)
  const [search, setSearch] = useState('')
  const [searchFriendStatus, setSearchFriendStatus] = useState(false)
  const [requestFriendStatus, setRequestFriendStatus] = useState(false)
  const [friendListStatus, setFriendListStatus] = useState(true)
  const [allFriends, setAllFriends] = useState([])
  const [resultSearchFriends, setResultSearchFriends] = useState([])
  const [resultRequestFriends, setResultRequestFriends] = useState([])
  const [resultFriends, setResultFriends] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    !isLogin && navigate('/')
  }, [isLogin, navigate])

  const handleTabStatus = (status) => {
    setFriendListStatus(status === 0)
    setRequestFriendStatus(status === 1)
    setSearchFriendStatus(status === 2)
  }

  const success = (message) => {
    Swal.fire({
      title: 'สำเร็จ',
      text: message,
      icon: 'success',
      confirmButtonText: 'ตกลง'
    })
  }

  const unsuccess = (message) => {
    Swal.fire({
      title: 'ล้มเหลว',
      text: message,
      icon: 'error',
      confirmButtonText: 'ตกลง'
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`${process.env.REACT_APP_API}/list-friends`, {headers: {
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
      setResultFriends(response.data)
    })
    .catch((error) => {})
  },[allFriends])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`${process.env.REACT_APP_API}/request-friends`, {headers: {
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
      setResultRequestFriends(response.data)
    })
    .catch((error) => {})
  },[allFriends])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`${process.env.REACT_APP_API}/search-friends`, {headers: {
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
      setAllFriends(response.data)
      setResultSearchFriends(response.data)
    })
    .catch((error) => {})
    
  },[])

  const handleSearchMedia = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
    setResultSearchFriends(allFriends.filter(friend => friend.username.toLowerCase().includes(search.toLowerCase())))
  }

  const handleAddFriend = (id) => {
    const token = localStorage.getItem('token')
    axios.post(`${process.env.REACT_APP_API}/add-friends`, {id: id}, {headers: {
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
      if(response.data.status){
        setAllFriends(allFriends.filter(friend => friend.id !== response.data.account[0]))
        setResultSearchFriends(allFriends.filter(friend => friend.id !== response.data.account[0]))
        success('เพิ่มเพื่อนสำเร็จ')
      }
    })
    .catch((error) => {
      unsuccess('เพิ่มเพื่อนไม่สำเร็จ')
    })
  }

  const handleIgnoreFriend = (id) => {
    const token = localStorage.getItem('token')
    axios.delete(`${process.env.REACT_APP_API}/ignore-friends`, {
      data: {id: id},
      headers: {
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
      if(response.data.status){
        axios.get(`${process.env.REACT_APP_API}/search-friends`, {headers: {
          'Authorization': `Bearer ${token}`
        }})
        .then((response) => {
          setAllFriends(response.data)
          setResultSearchFriends(response.data)
        })
        .catch((error) => {})
        success('ปฏิเสธเพื่อนสำเร็จ')
      }
    })
    .catch((error) => {
      unsuccess('ปฏิเสธเพื่อนไม่สำเร็จ')
    })
  }

  const handleAcceptFriend = (id) => {
    const token = localStorage.getItem('token')
    axios.delete(`${process.env.REACT_APP_API}/accept-friends`, {
      data: {id: id},
      headers: {
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
      if(response.data.status){
        axios.get(`${process.env.REACT_APP_API}/search-friends`, {headers: {
          'Authorization': `Bearer ${token}`
        }})
        .then((response) => {
          setAllFriends(response.data)
          setResultSearchFriends(response.data)
        })
        .catch((error) => {})
        success('ยอมรับเพื่อนสำเร็จ')
      }
    })
    .catch((error) => {
      unsuccess('ยอมรับเพื่อนไม่สำเร็จ')
    })
  }

  const handleUnFriend = (id) => {
    const token = localStorage.getItem('token')
    axios.delete(`${process.env.REACT_APP_API}/un-friends`, {
      data: {id: id},
      headers: {
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
      if(response.data.status){
        axios.get(`${process.env.REACT_APP_API}/search-friends`, {headers: {
          'Authorization': `Bearer ${token}`
        }})
        .then((response) => {
          setAllFriends(response.data)
          setResultSearchFriends(response.data)
        })
        .catch((error) => {})
        success('ลบเพื่อนสำเร็จ')
      }
    })
    .catch((error) => {
      unsuccess('ลบเพื่อนไม่สำเร็จ')
    })
  }

  const handlePreferencetFriend = (id) => {
    navigate(`/preference-friend/${id}`)
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

          {resultFriends.map((friend) => (
            <div class="card w-full shadow-xl">
              <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
                <h2 class="card-title">{friend.username}</h2>
                <h2 class="card-title text-slate-500 text-sm">ID: {friend.friend_id}</h2>
                <div className='flex'>
                  <button onClick={() => handleUnFriend(friend.friend_id)} class="flex-1 btn btn-outline btn-primary m-1">เลิกเป็นเพื่อน</button>
                  <button onClick={() => handlePreferencetFriend(friend.friend_id)} class="flex-1 btn text-white btn-info m-1">รายการโปรด</button>
                </div>
              </div>
            </div>
          ))}

          </div>
      </div>
    </div>

    <div className={`${!requestFriendStatus && 'hidden'}`}>
      <div className={`container mx-auto px-10`}>
        <div className={`rounded grid place-content-center grid-cols-3 gap-3`}>

        {resultRequestFriends.map((friend) => (
          <div class="card w-full shadow-xl">
            <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
              <h2 class="card-title">{friend.username}</h2>
              <h2 class="card-title text-slate-500 text-sm">ID: {friend.friend_id}</h2>
              <div className='flex'>
                <button onClick={() => handleIgnoreFriend(friend.friend_id)} class="flex-1 btn btn-outline btn-primary m-1">ไม่สนใจ</button>
                <button onClick={() => handleAcceptFriend(friend.friend_id)} class="flex-1 btn btn-primary m-1">ยอมรับ</button>
              </div>
            </div>
          </div>
        ))}

          </div>
      </div>
    </div>

    <div className={`${!searchFriendStatus && 'hidden'}`}>
      <div className='container mx-auto py-5 px-10'>
          <input value={search} onChange={(event) => setSearch(event.target.value)} onKeyUp={handleSearchMedia} type="text" placeholder="ค้นหาเพื่อนด้วยนามแฝง..." className={`${darkMode ? "bg-gray-200" : "bg-gray-200"} text-primary input input-bordered w-full text-xl font-black mb-3`} />
      </div>

      <div className={`container mx-auto px-10`}>
        <div className={`rounded grid place-content-center grid-cols-3 gap-3`}>

        {resultSearchFriends.map((friend) => (
          <div class="card w-full shadow-xl">
          <div class={`card-body text-black rounded-md ${darkMode ? "bg-white" : "bg-gray-200"}`}>
            <h2 class="card-title">{friend.username}</h2>
            <h2 class="card-title text-slate-500 text-sm">ID: {friend.id}</h2>
            <button onClick={() => handleAddFriend(friend.id)} class="btn btn-outline btn-primary">เพิ่มเพื่อน</button>
          </div>
        </div>
        ))}

        </div>
      </div>
    </div>
    </>
  )
}
  
export default Friends