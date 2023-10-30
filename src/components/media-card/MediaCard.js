import { useSelector } from 'react-redux'
import { RiHeart3Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import PreferenceButton from '../preference-button/PreferenceButton'

const MediaCard = ({media, mediaPreference, setMediaPreference}) => {
    const darkMode = useSelector((state) => state.switchMode.darkMode)
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const preferenceModal = (event) => {
        isLogin ? document.getElementById(`isSignIn-${media.id}`).showModal() : document.getElementById(`isSignOut-${media.id}`).showModal()
        event.preventDefault()
    }
    return (<>
        <PreferenceButton media_id={media.id} mediaPreference={mediaPreference} setMediaPreference={setMediaPreference}/>
        <Link to={`/media/${media.id}/${media.linked_to}`}>
            <div className={`card w-full h-full hover:scale-95 transition duration-700 ease-in-out ${darkMode ? "glass" : "bg-gray-200"}`}>
                <figure className='relative h-3/5'>
                    <img className='object-fill w-full h-full' src={require(`../../asset/cover-photo/${media.cover_photo}`)} alt={media.title} title={media.title} />
                    <div className="absolute top-2 right-2 badge badge-primary p-3">มี {media.episode_amount} ตอน</div>
                    {isLogin ? 
                    !mediaPreference.includes(media.id) && <button className='absolute top-10 right-2 btn btn-circle btn-primary' title='เพิ่มรายการโปรด' onClick={preferenceModal}><RiHeart3Line size={24}/></button>
                    : media.id && <button className='absolute top-10 right-2 btn btn-circle btn-primary' title='เพิ่มรายการโปรด' onClick={preferenceModal}><RiHeart3Line size={24}/></button>}  
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

export default MediaCard