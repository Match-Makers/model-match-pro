import Header from '@/components/Header';
import Image from 'next/image';
import backsplash from '../img/backsplash.jpeg';

const containerStyle = {
  position: 'relative',
  width: '100vw',
  height: '30vh',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
  padding: '30px',
};

const imageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // This will ensure the image covers the entire container
};

const paragraphStyle = {
  fontWeight: 'bold',
};

export default function Home() {
  return (
    <>
    <div>
      <Image src={backsplash} alt="blue background image" style={imageStyle} />
      <Header />
    </div>
    <div style={containerStyle}>
      <p style={paragraphStyle}>Model Match Pro is a valuable tool for developers, enabling them to compare multiple machine learning models simultaneously, making it easier to select the best fit for their specific use cases. Its comprehensive analysis, visualization tools, and collaborative features simplify the decision-making process. With Model Match Pro, developers can save time and make more informed choices, leading to more efficient and effective machine learning solutions.</p>
    </div>
    </>
  );
}
