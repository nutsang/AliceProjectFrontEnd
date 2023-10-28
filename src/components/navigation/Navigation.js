import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FiEdit } from "react-icons/fi";
import { RiHeart3Line, RiMoonClearLine, RiSunLine, RiSearch2Line } from 'react-icons/ri'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FaUserFriends } from 'react-icons/fa'
import { BiLogOut, BiLogIn, BiSolidUserAccount } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { switchMode } from '../../redux/switchModeSlice'
import { setIsLogin } from '../../redux/isLoginSlice'
import { signOutAccount } from '../../service/authentication'
import axios from 'axios'
import Swal from 'sweetalert2';

const Navigation = () => {
  const darkMode = useSelector((state) => state.switchMode.darkMode)
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.isLogin.isLogin)
  const navigate = useNavigate()
  
  useEffect(()=>{
    document.body.style.backgroundColor = darkMode ? '#000000' : '#ffffff'
    document.body.style.color = darkMode ? '#ffffff' : '#000000'
  }, [darkMode])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.post(`${process.env.REACT_APP_API}/sign-in-authentication`, {}, {headers: {
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
      dispatch(setIsLogin(true))
    })
    .catch((error) => {
      dispatch(setIsLogin(false))
      localStorage.removeItem('token')
    })
  }, [isLogin, dispatch])

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

  return (
    <div className='navbar bg-primary text-primary-content'>
      <div className='navbar-start'>
        <div className='dropdown lg:hidden'>
            <label tabIndex={0} className='btn btn-ghost btn-circle'><GiHamburgerMenu size={32} /></label>
            {isLogin ? 
            (
              <ul tabIndex={0} className='dropdown-content menu mt-3 p-2 z-[1] shadow bg-primary rounded-box w-52'>
                <li><Link to='/search'><RiSearch2Line size={16} /> ค้นหาข้อมูล</Link></li>
                <li><Link to='/search'><RiHeart3Line size={16} /> รายการโปรด</Link></li>
                <li><Link to='/edit-account'><FiEdit size={16} /> แก้ไขโปรไฟล์</Link></li>
                <li><Link to='/friends'><FaUserFriends size={16} /> เพื่อน</Link></li>
                <li><Link to='#' onClick={() => {signOutAccount(success, unsuccess)}}><BiLogOut size={16} /> ออกจากระบบ</Link></li>
              </ul>
            ): 
            (
              <ul tabIndex={0} className='dropdown-content menu mt-3 p-2 z-[1] shadow bg-primary rounded-box w-52'>
                <li><Link to='/search'><RiSearch2Line size={16} /> ค้นหาข้อมูล</Link></li>
                <li><Link to='/sign-up'><BiSolidUserAccount size={16} /> สร้างบัญชี</Link></li>
                <li><Link to='/sign-in'><BiLogIn size={16} /> เข้าสู่ระบบ</Link></li>
              </ul>
            )}
          </div>
        <Link to='/' className='btn btn-ghost normal-case hidden lg:flex'>Alice Project</Link>
      </div>
      <div className='navbar-center'>
        <Link to='/' className='btn btn-ghost normal-case lg:hidden'>Alice Project</Link>
      </div>
      <div className='navbar-end gap-2'>
        <div className='tooltip tooltip-bottom tooltip-primary text-base' data-tip='ค้นหาข้อมูล'>
          <Link to='/search' className='btn btn-ghost btn-circle hidden lg:flex'><RiSearch2Line size={32} /></Link>
        </div>
        {isLogin && (
          <div className='tooltip tooltip-bottom tooltip-primary text-base' data-tip='รายการโปรด'>
            <Link to='/preference' className='btn btn-ghost btn-circle hidden lg:flex'>
              <RiHeart3Line size={32} />
            </Link>
          </div>
        )}
        <div className='tooltip tooltip-bottom tooltip-primary text-base' data-tip={darkMode ? "โหมดกลางวัน" : "โหมดกลางคืน"}>
          <div className='btn btn-ghost btn-circle' onClick={() => dispatch(switchMode())}>
            {darkMode ? (<RiSunLine size={32} />) : (<RiMoonClearLine size={32} />)}
          </div>
        </div>
        <div className='dropdown dropdown-hover dropdown-bottom dropdown-end hidden lg:flex'>
          <label tabIndex={1} className='btn btn-ghost btn-circle'><FaRegCircleUser size={32} /></label>
          {isLogin ? 
          (
            <ul tabIndex={1} className='dropdown-content menu mt-3 p-2 z-[1] shadow bg-primary rounded-box w-52'>
              <li><Link to='/edit-account'><FiEdit size={16} /> แก้ไขโปรไฟล์</Link></li>
              <li><Link to='/friends'><FaUserFriends size={16} /> เพื่อน</Link></li>
              <li><Link to='#' onClick={() => {signOutAccount(success, unsuccess)}}><BiLogOut size={16} /> ออกจากระบบ</Link></li>
            </ul>
          ) : 
          (
            <ul tabIndex={1} className='dropdown-content menu mt-3 p-2 z-[1] shadow bg-primary rounded-box w-52'>
            <li><Link to='/sign-up'><BiSolidUserAccount size={16} /> สร้างบัญชี</Link></li>
            <li><Link to='/sign-in'><BiLogIn size={16} /> เข้าสู่ระบบ</Link></li>
            </ul>
          )}

        </div>
      </div>
    </div>
  )
}
  
export default Navigation