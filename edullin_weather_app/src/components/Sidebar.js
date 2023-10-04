import Logo from '../assets/icon.png';
import {SiWindows} from 'react-icons/si';
import {BsBarChartLineFill} from 'react-icons/bs';
import {FaMapMarkerAlt} from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className='h-100 text-white d-flex flex-column align-items-center' style={{width:'200px',backgroundColor:'#6165F7'}}>
      <h4 className='m-3 d-flex align-items-center'><img src={Logo} alt='Logo'/>Weather</h4>
      <ul className='list-unstyled w-100 mt-5'>
        <li className='mb-3 px-4'><SiWindows className='mx-2'/>Dashboard</li>
        <li className='mb-3 px-4'><BsBarChartLineFill className='mx-2'/>Statistics</li>
        <li className='mb-3 px-4'><FaMapMarkerAlt className='mx-2'/>Map</li>
      </ul>
    </div>
  )
}
