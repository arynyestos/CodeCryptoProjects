import { Logo } from "./Logo"
import datos from "../datos.json"

export function Cabecera() {
    return <div className="my-2 text-dark d-flex justify-content-between">
        <div className="d-flex">
            <Logo></Logo>
            <p className="fs-4">{datos.cabecera.nombre}</p>
        </div>
        <div>
            {
                datos.cabecera.enlaces.map((item, index) =>
                    <a key={index} className="mx-3 text-decoration-none" href={item.URL}>{item.texto}</a>
                )
            }
        </div>
    </div>
}
