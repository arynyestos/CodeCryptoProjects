import datos from "../datos.json"

function Sección({data}) {
    return <div>
        <h5>{data.titulo}</h5>
        <ul className="nav flex-column">
            {
                data.enlaces.map((item,index) =>
                <li key={index}><a className="text-decoration-none" target="blank" href={item.URL}>{item.titulo}</a></li>            )
            }
        </ul>
    </div>
}

export function Pie() {
    return <div className="d-flex justify-content-between mt-4">
        <div className="fs-4">{datos.cabecera.nombre}</div>
        {
            datos.pie.map((item,index) =>
                <Sección key={index} data={item} />
            )
        }
    </div>
}