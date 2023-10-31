import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import InputBox from '../../components/input-box/InputBox'

const EditAccount = () => {
  const isLogin = useSelector((state) => state.isLogin.isLogin)
  const navigate = useNavigate()
  useEffect(()=>{
    !isLogin && navigate('/')
  }, [isLogin])

  const darkMode = useSelector((state) => state.switchMode.darkMode)
  const [account ,setAccount] = useState({username:'', email:'', newPassword:'', password:''})
  
  const success = (message) => {
    Swal.fire({
      title: 'สำเร็จ',
      text: message,
      icon: 'success',
      confirmButtonText: 'ตกลง'
    })
    setAccount({email:'', password:''})
    navigate('/')
  }

  const unsuccess = (message) => {
    Swal.fire({
      title: 'ล้มเหลว',
      text: message,
      icon: 'error',
      confirmButtonText: 'ตกลง'
    })
  }

  const setEmail = (email) => {
    setAccount({...account,email:email.target.value})
  }

  const setPassword = (passwords) => {
    const password = passwords.target.value
    setAccount({...account,password:password})
  }

  const setNewPassword = (newPasswords) => {
    const newPassword = newPasswords.target.value
    setAccount({...account,newPassword:newPassword})
  }

  return (
    <>
    <MetaHeader title={`แก้ไขโปรไฟล์`} />
    <Navigation />
    <div className='container t mx-auto w-full h-full mt-10 flex justify-center'>
      <form className={`p-10 rounded ${darkMode ? 'glass' : ' bg-slate-100 shadow-2xl'}`}>
        <h1 className='text-4xl mb-3'>แก้ไขโปรไฟล์</h1>
        <InputBox label={'นามแฝง (มีผลในการให้เพื่อนค้นหา)'} placeholder={''} type={'text'} value={account.email} callbackFunction={setEmail} />
        <InputBox label={'รหัสผ่านใหม่'} placeholder={''} type={'password'}  eye={true} value={account.password} callbackFunction={setPassword} />
        <InputBox label={'ยืนยันรหัสผ่านเก่าเพื่อบันทึกข้อมูล'} placeholder={''} type={'password'}  eye={true} value={account.newPassword} callbackFunction={setNewPassword} />
        <div className='flex flex-col w-full border-opacity-50  my-5'>
          <button type='submit' className='btn btn-primary grid'>บันทึกข้อมูล</button>
        </div>
      </form>
    </div>
    </>
  )
}
  
export default EditAccount