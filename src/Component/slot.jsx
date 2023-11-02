import './Slot.css'
import redtoken from '../assets/redtoken.png'
import blacktoken from '../assets/blacktoken.png'



const Slot =({ch,y,x})=>
{
return <div className="slot" x={x} y={y} >
    {ch && (
        <img src={ch === 'X' ? redtoken :blacktoken} width='100%' height='100%'/>
    )
    }

</div>
}

export default Slot