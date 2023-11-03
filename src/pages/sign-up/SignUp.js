import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import InputBox from '../../components/input-box/InputBox'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { signUpAccount } from '../../service/authentication'

const SignUp = () => {
  const navigate = useNavigate()

  const isLogin = useSelector((state) => state.isLogin.isLogin)
  
  useEffect(()=>{
    isLogin && navigate('/')
  }, [isLogin, navigate])

  const darkMode = useSelector((state) => state.switchMode.darkMode)
  const atLeastOneUppercase = /[A-Z]/g
  const atLeastOneLowercase = /[a-z]/g
  const atLeastOneNumeric = /[0-9]/g
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g
  const eightCharsOrMore = /.{8,}/g
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
  
  const [passwordRequireMent, setPasswordRequireMent] = useState({minimumLength: false, alphabetLower: false, alphabetUpper: false, number: false, special: false})
  const [account ,setAccount] = useState({userName:'', email:'', password:'', confirmPassword:''})

  const setUserName = (userName) => {
    setAccount({...account,userName:userName.target.value})
  }

  const setEmail = (email) => {
    setAccount({...account,email:email.target.value})
  }

  const setPassword = (passwords) => {
    const password = passwords.target.value
    setAccount({...account,password:password})
    setPasswordRequireMent({minimumLength: password.match(eightCharsOrMore),
      alphabetLower: password.match(atLeastOneLowercase),
      alphabetUpper: password.match(atLeastOneUppercase),
      number: password.match(atLeastOneNumeric),
      special: password.match(atLeastOneSpecialChar)})
  }

  const setConfirmPassword = (confirmPassword) => {
    setAccount({...account,confirmPassword:confirmPassword.target.value})
  }

  const success = (message) => {
    Swal.fire({
      title: 'สำเร็จ',
      text: message,
      icon: 'success',
      confirmButtonText: 'ตกลง'
    })
    setAccount({userName:'', email:'', password:'', confirmPassword:''})
    setPasswordRequireMent({minimumLength: false, alphabetLower: false, alphabetUpper: false, number: false, special: false})
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

  const createAccount = (event) => {
    event.preventDefault()

    if(account.userName.length <= 0 || account.email.length <= 0 || account.password.length <= 0 || account.confirmPassword.length <= 0){
      Swal.fire({
        title: 'คำเตือน',
        text: (account.userName.length <= 0) ? 'กรุณากรอกนามแฝง' : (account.email.length <= 0) ? 'กรุณากรอกอีเมล' : (account.password.length <= 0) ? 'กรุณากรอกรหัสผ่าน' : (account.confirmPassword.length <= 0) && 'กรุณายืนยันรหัสผ่าน',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      })
    }else if(!account.email.match(emailRegex)){
      Swal.fire({
        title: 'คำเตือน',
        text: 'กรุณากรอกรูปแบบอีเมลให้ถูกต้อง',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      })
    }else if(!passwordRequireMent.minimumLength || !passwordRequireMent.alphabetLower || !passwordRequireMent.alphabetUpper || !passwordRequireMent.number || !passwordRequireMent.special){
      Swal.fire({
        title: 'คำเตือน',
        text: (!passwordRequireMent.minimumLength) ? 
        'ต้องการความยาวรหัสผ่านอย่างน้อย 8 ตัว' : 
        (!passwordRequireMent.alphabetLower) ? 
        'ต้องการตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว' : 
        (!passwordRequireMent.alphabetUpper) ? 
        'ต้องการตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว' : 
        (!passwordRequireMent.number) ? 
        'ต้องการตัวเลขอย่างน้อย 1 ตัว' : 
        (!passwordRequireMent.special) && 
        'ต้องการตัวอักษรพิเศษอย่างน้อย 1 ตัว',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      })
    }else if(account.password !== account.confirmPassword){
      Swal.fire({
        title: 'คำเตือน',
        text: 'กรุณากรอกรหัสผ่าน และ ยืนยันรหัสผ่านให้ตรงกัน',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      })
    }else{
      axios.post(`${process.env.REACT_APP_API}/sign-up-validation`, account)
      .then((response) => {
        if(response.data.message === 'ผ่านการตรวจสอบ'){
          signUpAccount(account, success, unsuccess)
        }
      })
      .catch((error) => {
        if(error.response === undefined){
          Swal.fire({
            title: 'ล้มเหลว',
            text: 'สร้างบัญชีล้มเหลว',
            icon: 'error',
            confirmButtonText: 'ตกลง'
          })
        }else{
          Swal.fire({
            title: 'คำเตือน',
            text: error.response.data.message,
            icon: 'warning',
            confirmButtonText: 'ตกลง'
          })
        }
      })
    }
  }

  return (
    <>
    <MetaHeader title={`สร้างบัญชี`} />
    <Navigation />
    <div className='container t mx-auto w-full h-full mt-10 flex justify-center'>
      <form onSubmit={createAccount} className={`p-10 rounded ${darkMode ? 'glass' : ' bg-slate-100 shadow-2xl'}`}>
        <h1 className='text-4xl mb-3'>สมัครสมาชิก</h1>
        <InputBox label={'นามแฝง'} placeholder={''} type={'text'} value={account.userName} callbackFunction={setUserName} />
        <InputBox label={'อีเมล'} placeholder={''} type={'text'} value={account.email} callbackFunction={setEmail} />
        <InputBox label={'รหัสผ่าน'} placeholder={''} type={'password'}  eye={true} value={account.password} callbackFunction={setPassword} />
        <InputBox label={'ยืนยันรหัสผ่าน'} placeholder={''} type={'password'}  eye={true} value={account.confirmPassword} callbackFunction={setConfirmPassword} />
        <div className='form-control w-full max-w-xs my-5'>
          <p>ความต้องการของรหัสผ่าน:</p>
          <ul>
            <li className={`${passwordRequireMent.minimumLength ? 'text-success' : 'text-error'}`}>* ความยาวรหัสผ่านอย่างน้อย 8 ตัว</li>
            <li className={`${passwordRequireMent.alphabetLower ? 'text-success' : 'text-error'}`}>* มีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว</li>
            <li className={`${passwordRequireMent.alphabetUpper ? 'text-success' : 'text-error'}`}>* มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว</li>
            <li className={`${passwordRequireMent.number ? 'text-success' : 'text-error'}`}>* มีตัวเลขอย่างน้อย 1 ตัว</li>
            <li className={`${passwordRequireMent.special ? 'text-success' : 'text-error'}`}>* มีเครื่องหมายพิเศษ เช่น #?!@$%^&*- อย่างน้อย 1 ตัว</li>
          </ul>
        </div>
        <div className='flex flex-col w-full border-opacity-50'>
          <button type='submit' className='btn btn-primary grid'>สร้างบัญชี</button>
          <div className='divider'>หรือ</div>
          <Link to='/sign-in' className='btn btn-outline btn-info grid'>ไปหน้าเข้าสู่ระบบ</Link>
        </div>
      </form>
    </div>
    </>
  )
}
  
export default SignUp