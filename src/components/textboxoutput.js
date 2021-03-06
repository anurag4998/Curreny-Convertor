import React, { useState } from "react";

const TextboxOutput = (props) => {

    let[currencyname, setcurrencyname] = useState()
    let currencyID = props.idarray
    let optionItems = currencyID.map((currencyID) =>
      <option key={currencyID}>{currencyID}</option>
    );

     const handleinput = (event) => {
        event.preventDefault()
        let curId = event.target.value;
        var obj = props.obj
        setcurrencyname(obj[curId])
        props.setcurrencyid(event.target.value)

      }

     

    return(
    <div className="outputbox">
        <p className="input-header">{currencyname ? currencyname : "United Arab Emirates Dirham"}</p>
        <form autoComplete="off">
            <select className="text-select-box" onChange = {handleinput} name= "id" >
                    {optionItems}
            </select>
            <input className="text-box" type="number" name="amount" defaultValue = {props.convertedamount} readOnly/>
        </form>
      </div>
    )   
   
}

export default TextboxOutput