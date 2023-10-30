import { useSelector } from 'react-redux'
import { MdPublic, MdPublicOff, MdDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import PreferenceButton from '../preference-button/PreferenceButton'
import { useState } from 'react'

const PreferenceCard = ({media, mediaPreference, setMedia}) => {
    const darkMode = useSelector((state) => state.switchMode.darkMode)
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const [isPublic , setIsPublic] = useState(media.public)
    const preferenceModal = (event) => {
        if(isLogin){
            isPublic ? document.getElementById(`isPrivate-${media.id}`).showModal() : document.getElementById(`isPublic-${media.id}`).showModal()
        }else{
            document.getElementById(`isSignOut-${media.id}`).showModal()
        }
        event.preventDefault()
    }

    const preferenceModalDelete = (event) => {
        if(isLogin){
            document.getElementById(`isDelete-${media.id}`).showModal()
        }else{
            document.getElementById(`isSignOut-${media.id}`).showModal()
        }
        event.preventDefault()
    }

    return (<>
        <PreferenceButton media_id={media.id} setIsPublic={setIsPublic} mediaPreference={mediaPreference} setMediaPreference={setMedia} />
        <Link to={`/media/${media.id}/${media.linked_to}`}>
            <div className={`card w-full h-full hover:scale-95 transition duration-700 ease-in-out ${darkMode ? "glass" : "bg-gray-200"}`}>
                <figure className='relative h-3/5'>
                    <img className='object-fill w-full h-full' src={require(`../../asset/cover-photo/${media.cover_photo}`)} alt={media.title} title={media.title} />
                    <div className="absolute top-2 right-2 badge badge-primary p-3">มี {media.episode_amount} ตอน</div>
                    <button className='absolute top-10 right-2 btn btn-circle btn-primary' title={isPublic ? 'เปิดสาธารณะ' : 'เปิดส่วนตัว'} onClick={preferenceModal}>
                        {isPublic ? <MdPublic size={24}/> : <MdPublicOff size={24}/>}
                    </button>
                    <button className='absolute top-24 right-2 btn btn-circle btn-primary' title='ลบรายการโปรด' onClick={preferenceModalDelete}>
                        <MdDeleteOutline size={24}/>
                    </button>
                </figure>
                <div className='card-body h-2/5'>
                    <h3 className='card-title break-all'>{media.title}</h3>
                    <div className='card-actions justify-end'>
                        {media.subtitle !== 'ไม่มี' && (<div className='badge badge-primary p-3'>ซับ{media.subtitle}</div>)}
                        {media.dubbed !== 'ไม่มี' && (<div className='badge badge-primary p-3'>พากย์{media.dubbed}</div>)}
                    </div>
                </div>
            </div>
        </Link>
    </>)
}

export default PreferenceCard