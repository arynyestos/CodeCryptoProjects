import {Outlet, Link} from 'react-router-dom'

export function Inicio() {
    return(
        <div className='container'>
            <div className='text-end'>
                <Link className='mx-2' to="/productos">Productos</Link>
                <Link to="/cesta">Cesta</Link>
            </div>
            <div>
                <Outlet/>
            </div>            
        </div>
    )
}