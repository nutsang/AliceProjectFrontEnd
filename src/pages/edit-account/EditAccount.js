import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import InputBox from '../../components/input-box/InputBox'
import axios from 'axios'
import { updateUsernameAccount, updateUsernameAndPasswordAccount } from '../../service/authentication'

const EditAccount = () => {
  const isLogin = useSelector((state) => state.isLogin.isLogin)
  const navigate = useNavigate()
  useEffect(()=>{
    !isLogin && navigate('/')
  }, [isLogin, navigate])

  const darkMode = useSelector((state) => state.switchMode.darkMode)
  const [account, setAccount] = useState({username:'', newPassword:'', password:''})
  const [oldUsername, setOldUsername] = useState('')
  const [friendId, setFriendID] = useState('')

  const success = (message) => {
    Swal.fire({
      title: 'สำเร็จ',
      text: message,
      icon: 'success',
      confirmButtonText: 'ตกลง'
    })
    setOldUsername(account.username)
    setAccount({...account, newPassword:'', password:''})
  }

  const unsuccess = (message) => {
    Swal.fire({
      title: 'ล้มเหลว',
      text: message,
      icon: 'error',
      confirmButtonText: 'ตกลง'
    })
  }

  const setUsername = (username) => {
    setAccount({...account,username:username.target.value})
  }

  const setPassword = (passwords) => {
    setAccount({...account,password:passwords.target.value})
  }

  const setNewPassword = (newPassword) => {
    setAccount({...account,newPassword:newPassword.target.value})
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.get(`${process.env.REACT_APP_API}/edit-account`, {headers: {
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
      setOldUsername(response.data[0].username)
      setFriendID(response.data[0].id)
      setAccount({...account, username: response.data[0].username})
    })
    .catch((error) => {})
  },[isLogin])

  const handleEditAccount = (event) => {
    event.preventDefault()
    if(account.newPassword === ''){
      updateUsernameAccount(account, success, unsuccess)
    }else{
      updateUsernameAndPasswordAccount(account, success, unsuccess)
    }
  
  }

  return (
    <>
    <MetaHeader title={`แก้ไขโปรไฟล์`} />
    <Navigation />
    <div className='container t mx-auto w-full h-full mt-10 flex justify-center'>
      <form onSubmit={handleEditAccount} className={`p-10 rounded ${darkMode ? 'glass' : ' bg-slate-100 shadow-2xl'}`}>
        <h1 className='text-4xl mb-3'>แก้ไขโปรไฟล์ ID:{friendId}</h1>
        <InputBox label={'นามแฝง (มีผลในการให้เพื่อนค้นหา)'} placeholder={''} type={'text'} value={account.username} callbackFunction={setUsername} />
        <InputBox label={'เปลี่ยนรหัสผ่านใหม่'} placeholder={''} type={'password'}  eye={true} value={account.newPassword} callbackFunction={setNewPassword} />
        <div className={`${(oldUsername === account.username && account.newPassword === '') && 'hidden'}`}>
          <InputBox label={'ยืนยันรหัสผ่านเก่าเพื่อบันทึกข้อมูล'} placeholder={''} type={'password'}  eye={true} value={account.password} callbackFunction={setPassword} />
          <div className='flex flex-col w-full border-opacity-50  my-5'>
            <button type='submit' className='btn btn-primary grid'>บันทึกข้อมูล</button>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}
  
export default EditAccount