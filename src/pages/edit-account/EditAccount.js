import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const EditAccount = () => {
  const isLogin = useSelector((state) => state.isLogin.isLogin)
  const navigate = useNavigate()
  useEffect(()=>{
    !isLogin && navigate('/')
  }, [isLogin])

  return (
    <>
    <MetaHeader title={`แก้ไขโปรไฟล์`} />
    <Navigation />
    <div>EditAccount</div>
    </>
  )
}
  
export default EditAccount