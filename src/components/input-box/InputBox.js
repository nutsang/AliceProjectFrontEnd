import { useState } from "react"
import { useSelector } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const InputBox = ({label, placeholder, type, eye=false, value, callbackFunction}) => {
    const darkMode = useSelector((state) => state.switchMode.darkMode)
    const [hide, setHide] = useState(true)
  return (
    <div className='form-control w-full max-w-xs'>
        <label className='label'>
        <span className={`label-text ${darkMode ? 'text-white' : 'text-black'}`}>{label}</span>
        </label>
        {eye ? 
        <label className="input-group">
            <input value={value} type={hide ? type : 'text'} placeholder={placeholder} className='input input-bordered input-primary w-full max-w-xs' onChange={callbackFunction} />
            <span className='bg-primary text-white' onClick={()=>setHide(!hide)}>{hide ? <AiFillEye size={24}/> : <AiFillEyeInvisible size={24}/>}</span>
        </label>
         : <input value={value} type={type} placeholder={placeholder} className='input input-bordered input-primary w-full max-w-xs' onChange={callbackFunction} />}
    </div>
  )
}

export default InputBox