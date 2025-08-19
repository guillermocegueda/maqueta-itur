import type { ChangeEventHandler } from "react"
import type SelectInterface from "../interfaces/Select"

interface Props {
  values: SelectInterface,
  change: ChangeEventHandler<HTMLSelectElement>
}
export default function Select({values, change}: Props) {
    return (
        <>
       <div className="filtro">
            <label htmlFor={values.for}>{values.for.toUpperCase()}:</label>
            <select name={values.name} onChange={change}>
              <option value="00">-- Selecciona una opción --</option>
              {values.values.map((opc) => (
                <option key={opc.value} value={opc.value}>{opc.text}</option>
              ))}
            </select>
          </div>
 
        </>
    )
}