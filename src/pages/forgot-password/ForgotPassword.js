import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import InputBox from '../../components/input-box/InputBox'
import { resetPassword } from '../../service/authentication'
import { useState } from 'react';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const darkMode = useSelector((state) => state.switchMode.darkMode)
    const [account ,setAccount] = useState({email:''})
    const navigate = useNavigate()

    const success = (message) => {
        Swal.fire({
        title: 'สำเร็จ',
        text: message,
        icon: 'success',
        confirmButtonText: 'ตกลง'
        })
        navigate('/sign-in')
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
    const recoveryPassword = (event) => {
        event.preventDefault()
        resetPassword(account.email, success, unsuccess)
    }
  return (
    <>
    <MetaHeader title={`กู้คืนรหัสผ่าน`} />
    <Navigation />
    <div className='container t mx-auto w-full h-full mt-10 flex justify-center'>
      <form onSubmit={recoveryPassword} className={`p-10 rounded ${darkMode ? 'glass' : ' bg-slate-100 shadow-2xl'}`}>
        <h1 className='text-4xl mb-3'>กู้คืนรหัสผ่าน</h1>
        <InputBox label={'อีเมล'} placeholder={''} type={'text'} value={account.email} callbackFunction={setEmail} />
        <div className='flex flex-col w-full border-opacity-50  my-5'>
          <button type='submit' className='btn btn-primary grid'>ยืนยันอีเมล</button>
          <div className='divider'>หรือ</div>
          <Link to='/sign-in' className='btn btn-outline btn-info grid'>ไปหน้าเข้าสู่ระบบ</Link>
        </div>
      </form>
    </div>
    </>
  )
}
  
export default ForgotPassword