import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import InputBox from '../../components/input-box/InputBox'
import { signInAccount } from '../../service/authentication'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const SignIn = () => {
  const isLogin = useSelector((state) => state.isLogin.isLogin)
  const navigate = useNavigate()
  useEffect(()=>{
    isLogin && navigate('/')
  }, [isLogin, navigate])

  const darkMode = useSelector((state) => state.switchMode.darkMode)
  const [account ,setAccount] = useState({email:'', password:''})
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

  const handleSignInAccount = (event) => {
    event.preventDefault()
    signInAccount(account, success, unsuccess)
  }

  return (
    <>
    <MetaHeader title={`เข้าสู่ระบบ`} />
    <Navigation />
    <div className='container t mx-auto w-full h-full mt-10 flex justify-center'>
      <form onSubmit={handleSignInAccount} className={`p-10 rounded ${darkMode ? 'glass' : ' bg-slate-100 shadow-2xl'}`}>
        <h1 className='text-4xl mb-3'>เข้าสู่ระบบ</h1>
        <InputBox label={'อีเมล'} placeholder={''} type={'text'} value={account.email} callbackFunction={setEmail} />
        <InputBox label={'รหัสผ่าน'} placeholder={''} type={'password'}  eye={true} value={account.password} callbackFunction={setPassword} />
        <div className='flex flex-col w-full border-opacity-50  my-5'>
          <button type='submit' className='btn btn-primary grid'>เข้าสู่ระบบ</button>
          <div className='divider'>หรือ</div>
          <Link to='/forgot-password' className='btn btn-outline btn-warning grid'>ลืมรหัสผ่าน หรือไม่ ?</Link>
          <div className='divider'>หรือ</div>
          <Link to='/sign-up' className='btn btn-outline btn-info grid'>ไปหน้าสมัครสมาชิก</Link>
        </div>
      </form>
    </div>
    </>
  )
}
  
export default SignIn