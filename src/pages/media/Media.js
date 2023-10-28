import MetaHeader from '../../components/meta-header/MetaHeader'
import Navigation from '../../components/navigation/Navigation'
import { useParams } from "react-router-dom"
import JWPlayer from '@jwplayer/jwplayer-react'
import { RiHeart3Line } from "react-icons/ri"

const Media = () => {
  const {id, linked_to} = useParams()
  return (
    <>
    <MetaHeader title={`เรื่อง`} />
    <Navigation />
    <div className='container mx-auto p-24'>
      <div className='card card-side shadow-xl glass'>
        <figure className='lg:w-96 relative hidden lg:flex'>
          <img className='object-fill w-full h-full hidden lg:flex' src={require('../../asset/cover-photo/cover-photo-1.jpg')} alt='Movie'/>
          <div className='absolute top-2 left-2 btn btn-circle btn-primary hidden lg:flex' title='เพิ่มรายการโปรด' onClick={(event)=>{event.preventDefault()}}><RiHeart3Line size={32}/></div>
        </figure>
        <div className='w-100 lg:w-4 card-body'>
          <h2 className='card-title'>Sword Art Online ซอร์ดอาร์ตออนไลน์</h2>
          <span className='hidden lg:flex'>เนื้อเรื่องย่อ</span>
          <span className='hidden lg:flex'>คิริงายะ คาสึโตะ เขาได้เข้าร่วมเล่น เกม เสมือนจริงที่มีชื่อว่า Sword Art Online หรือ SAO ซึ่งเมื่อเขาเล่นเกมส์ ต้อง พบว่าตนเอง ไม่สามารถลอ็กเอาท์ออกจากเกมได้ เหล่าผู้เล่นเกมทั้งหมดต้องติด อยู่ภายในเกม โดยไม่มีใครรู้ว่าผู้พัฒนาเกมมีเป้าหมายที่แท้จริงอย่างไรกันแน่!!! แต่ทางออกจากเกมนี้ไปได้มีเพียงต้องเคลียร์เกมได้สำเร็จ หรือโอเวอร์ในเกม ก็หมาย ถึง การตายของผู้เล่นที่เกิดขึ้นจริง ดังนั้นเพื่อตอบสนองเงื่อนไขของการเคลียร์เกมนี้และ ออก จากโลกเสมือนจริง คาสึโตะจึงต้องเคลียร์เกมนี้ให้สำเร็จให้ได้ หรือเขาต้องพบ กับความตาย!</span>
          <span>ประเภท: ต่อสู้ | แฟนตาซี | โรแมนติก</span>
          <span>คะแนนรวม: 8000</span>
          <span className="rating">
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
          </span>
          <div className='absolute top-2 right-2 btn btn-circle btn-primary lg:hidden' title='เพิ่มรายการโปรด' onClick={(event)=>{event.preventDefault()}}><RiHeart3Line size={32}/></div>
        </div>
      </div>

      <div className='collapse collapse-arrow bg-primary mt-5'>
        <input type='radio' name='episode' /> 
        <div className='collapse-title text-xl font-medium'>Sword Art Online ซอร์ดอาร์ตออนไลน์ ตอนที่ 1</div>
        <div className='collapse-content'> 
          <JWPlayer file='https://cdn.jwplayer.com/manifests/a88WV3o2.m3u8' library="https://cdn.jwplayer.com/libraries/wav0X4sN.js" />
        </div>
      </div>
      <div className='collapse collapse-arrow bg-primary mt-5'>
        <input type='radio' name='episode' /> 
        <div className='collapse-title text-xl font-medium'>Sword Art Online ซอร์ดอาร์ตออนไลน์ ตอนที่ 2</div>
        <div className='collapse-content'> 
          <p>hello</p>
        </div>
      </div>
      <div className='collapse collapse-arrow bg-primary mt-5'>
        <input type='radio' name='episode' /> 
        <div className='collapse-title text-xl font-medium'>Sword Art Online ซอร์ดอาร์ตออนไลน์ ตอนที่ 3</div>
        <div className='collapse-content'> 
          <p>hello</p>
        </div>
      </div>
    </div>
    </>
  )
}
  
export default Media