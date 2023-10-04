import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Charts from './components/Charts';

export default function App() {

  const initialLocation={name:'Delhi',latitude:28.65195,longitude:77.23149}
  const [location,setLocation]=useState(initialLocation)
  return (
    <div className='vh-100 p-3 d-flex justify-content-center align-items-center bg-light'>
      <div className='bg-white w-100 h-100 d-flex overflow-hidden rounded'>
        <Sidebar />
        <div className='w-100'>
          <Header location={location} setLocation={setLocation}/>
          <Charts location={location} />
        </div>
      </div>
    </div>
  )
}
