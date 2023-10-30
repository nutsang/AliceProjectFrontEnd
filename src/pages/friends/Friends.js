import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Friends = () => {
  const isLogin = useSelector((state) => state.isLogin.isLogin)
  const navigate = useNavigate()
  useEffect(()=>{
    !isLogin && navigate('/')
  }, [isLogin])

  return (
    <>
    <MetaHeader title={`เพื่อนของฉัน`} />
    <Navigation />
    <div>Friends</div>
    </>
  )
}
  
export default Friends