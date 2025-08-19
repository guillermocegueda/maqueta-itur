import type SelectInterface from "../interfaces/Select"

interface Props {
  values: SelectInterface
}
export default function Select({values}: Props) {
    return (
        <>
       <div className="filtro">
            <label htmlFor={values.for}>{values.for.toUpperCase()}:</label>
            <select name={values.name}>
              {values.values.map((opc) => (
                <option key={opc.value} value={opc.value}>{opc.text}</option>
              ))}
            </select>
          </div>
 
        </>
    )
}