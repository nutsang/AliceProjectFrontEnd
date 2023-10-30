import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2';

const PreferenceButton = ({media_id, setIsPublic, mediaPreference, setMediaPreference}) => {
    const darkMode = useSelector((state) => state.switchMode.darkMode)

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

    const addPreference = () => {
        const token = localStorage.getItem('token')
        axios.post(`${process.env.REACT_APP_API}/preference`, {id:media_id}, {headers: {
            'Authorization': `Bearer ${token}`
          }})
          .then((response) => {
            setMediaPreference([...mediaPreference, media_id])
            success(response.data.message)
          })
          .catch((error) => {
            unsuccess(error.response.message)
          })
    }

    const deletePreference = () => {
        const token = localStorage.getItem('token')
        axios.delete(`${process.env.REACT_APP_API}/preference`, {
            data: {id:media_id},
            headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then((response) => {
            setMediaPreference(mediaPreference.filter(item => item.id !== media_id))
            success(response.data.message)
        })
        .catch((error) => {
            unsuccess(error.response)
        })
    }

    const publicPreference = () => {
        const token = localStorage.getItem('token')
        axios.patch(`${process.env.REACT_APP_API}/preference-public`, {id:media_id}, {headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then((response) => {
            setIsPublic(true)
            success(response.data.message)
        })
        .catch((error) => {
            unsuccess(error.response.message)
        })
    }

    const privatePreference = () => {
        const token = localStorage.getItem('token')
        axios.patch(`${process.env.REACT_APP_API}/preference-private`, {id:media_id}, {headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then((response) => {
            setIsPublic(false)
            success(response.data.message)
        })
        .catch((error) => {
            unsuccess(error.response.message)
        })
    }

    return (<>
        <dialog id={`isPublic-${media_id}`} className='modal sm:modal-middle'>
            <div className={`modal-box ${darkMode ? 'bg-black' : 'bg-gray-200'}`}>
                <h3 className='font-bold text-lg'>ยืนยันการเปิดให้เป็นสาธารณะ</h3>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form method="dialog">
                        <button className='btn btn-primary' onClick={publicPreference}>ยืนยัน</button>
                    </form>
                    <form method="dialog">
                        <button className='btn btn-outline btn-primary'>ยกเลิก</button>
                    </form>
                </div>
            </div>
        </dialog>
        <dialog id={`isPrivate-${media_id}`} className='modal sm:modal-middle'>
            <div className={`modal-box ${darkMode ? 'bg-black' : 'bg-gray-200'}`}>
                <h3 className='font-bold text-lg'>ยืนยันการเปิดให้เป็นส่วนตัว</h3>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form method="dialog">
                        <button className='btn btn-primary' onClick={privatePreference}>ยืนยัน</button>
                    </form>
                    <form method="dialog">
                        <button className='btn btn-outline btn-primary'>ยกเลิก</button>
                    </form>
                </div>
            </div>
        </dialog>
        <dialog id={`isSignIn-${media_id}`} className='modal sm:modal-middle'>
            <div className={`modal-box ${darkMode ? 'bg-black' : 'bg-gray-200'}`}>
                <h3 className='font-bold text-lg'>ยืนยันการเพิ่มรายการโปรด</h3>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form method="dialog">
                        <button className='btn btn-primary' onClick={addPreference}>เพิ่มเข้ารายการโปรด</button>
                    </form>
                    <form method="dialog">
                        <button className='btn btn-outline btn-primary'>ยกเลิก</button>
                    </form>
                </div>
            </div>
        </dialog>
        <dialog id={`isSignOut-${media_id}`} className='modal sm:modal-middle'>
            <div className={`modal-box ${darkMode ? 'bg-black' : 'bg-gray-200'}`}>
                <h3 className='font-bold text-lg'>เข้าสู่ระบบ หรือ สร้างบัญชี</h3>
                <p className='py-4 text-lg'>เข้าสู่ระบบเพื่อหาเพื่อน เพิ่มรายการโปรด หรือกดดาว</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <Link to='/sign-in' className='btn btn-primary'>เข้าสู่ระบบ</Link>
                    <Link to='/sign-up' className='btn btn-primary'>สร้างบัญชี</Link>
                </div>
            </div>
        </dialog>
        <dialog id={`isDelete-${media_id}`} className='modal sm:modal-middle'>
            <div className={`modal-box ${darkMode ? 'bg-black' : 'bg-gray-200'}`}>
                <h3 className='font-bold text-lg'>ยืนยันการลบรายการโปรด</h3>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form method="dialog">
                        <button className='btn btn-primary' onClick={deletePreference}>ยืนยัน</button>
                    </form>
                    <form method="dialog">
                        <button className='btn btn-outline btn-primary'>ยกเลิก</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>)
}

export default PreferenceButton