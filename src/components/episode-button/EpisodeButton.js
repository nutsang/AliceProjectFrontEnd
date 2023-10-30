const EpisodeButton = ({episode, jwp_episode_id, jwp_id, setJWP_ID}) => {
    return (<button className={`btn ${(jwp_id && jwp_episode_id) && jwp_id === jwp_episode_id ? 'btn-info' : 'btn-primary'}`} onClick={()=>{setJWP_ID(jwp_episode_id)}}>ตอนที่ {episode}</button>)
}

export default EpisodeButton