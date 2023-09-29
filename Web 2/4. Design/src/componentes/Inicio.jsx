import {Cabecera} from './Cabecera'
import {Carrusel} from './Carrusel'
import {Precios} from './Precios'
import {Pie} from './Pie'

export function Inicio() {
    return <div className='container'>        
        <Cabecera />
        <Carrusel />
        <Precios />
        <Pie />
    </div>
}