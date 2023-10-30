import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { useParams } from "react-router-dom"
import EpisodeButton from '../../components/episode-button/EpisodeButton'
import InformationCard from '../../components/information-card/InformationCard'
import JWPlayer from '@jwplayer/jwplayer-react'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'

const Media = () => {
  const {id, linked_to} = useParams()
  const [information, setInforamtion] = useState([])
  const [episodeList, setEpisodeList] = useState([])
  const [mediaPreference, setMediaPreference] = useState([])
  const [jwp_id, setJWP_ID] = useState('')
  const [episodeStatus, setEpisodeStatus] = useState(false)
  const darkMode = useSelector((state) => state.switchMode.darkMode)
  const isLogin = useSelector((state) => state.isLogin.isLogin)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/media/${id}/${linked_to}`)
    .then((response) => {
      setInforamtion(response.data[0])
      axios.get(`${process.env.REACT_APP_API}/episode/${id}`)
      .then((response) => {
        setEpisodeList(response.data.episode)
        setEpisodeStatus(response.data.status)
        setJWP_ID(response.data.episode[0].jwp_id)
      }).catch((error) => {})
    })
    if(isLogin){
        const token = localStorage.getItem('token')
        axios.get(`${process.env.REACT_APP_API}/preference`, {headers: {
          'Authorization': `Bearer ${token}`
        }})
        .then((response) => {
          setMediaPreference(response.data.map(item => item.id))
        })
        .catch((error) => {})
    }
  }, [])

  return (
    <>
    <MetaHeader title={`${information.title}`} />
    <Navigation />
    <div className='container mx-auto p-24'>
      <div className='mt-5 container flex flex-col'>
      <InformationCard  key={information.id} {...information} episode_amount={episodeList.length} mediaPreference={mediaPreference} setMediaPreference={setMediaPreference}/>
        {episodeStatus && 
        <div className='flex-1'>
          <div className={`collapse collapse-open mt-5 ${darkMode ? "glass" : "bg-gray-200"}`}>
              <div className='collapse-title text-xl font-medium'>{`${information.title} ดูได้แล้วที่นี่`}</div>
              <div className='collapse-content'>
                <JWPlayer key={jwp_id} file={`https://cdn.jwplayer.com/manifests/${jwp_id}.m3u8`} library={`https://cdn.jwplayer.com/libraries/wav0X4sN.js`} />
              </div>
          </div>
        </div>
        }
        {episodeStatus && 
        <div className='flex-1'>
          <div className={`collapse collapse-arrow mt-5 max-h-72 ${darkMode ? "glass" : "bg-gray-200"}`}>
              <input type='checkbox' name='episode' defaultChecked/> 
              <div className='collapse-title text-xl font-medium'>{`${information.title} เลือกตอนได้แล้วที่นี่`}</div>
              <div className='collapse-content overflow-auto'>
                <div className='grid place-content-center grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 m-5'>
                  {episodeList.map(episode => <EpisodeButton key={episode.id} episode={episode.episode_at} jwp_episode_id={episode.jwp_id} jwp_id={jwp_id} setJWP_ID={setJWP_ID}/>)}
                </div>
              </div>
          </div>
        </div>
        }
      </div>
    </div>
    </>
  )
}
  
export default Media