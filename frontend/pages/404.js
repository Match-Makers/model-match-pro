import Image from 'next/image'
import image404 from '../img/404.jpg'

export default function Custom404(){
  return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#E0F7FA', paddingTop: '25px' }}>
    <h1>Oops!</h1>
    <h2>404 - Page not found</h2>
    <p>Looks like you've ventured off the path...</p>
    <Image src={image404} alt="404 image" width={700} height={700} />
  </div>
  ); 
}