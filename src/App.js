import Header from './components/header';
import TextboxInput from './components/textboxinput';
import TextboxOutput from './components/textboxoutput';

import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


const url = 'https://free.currconv.com/api/v7/currencies?apiKey=a96ffd9a0755eb283446'

function App() {
  let[currency_id_array, set_currency_id_array] = useState([])
  let[currency_object_array, set_currency_object_array] = useState({})

  let[fromcurrencyid, setfromcurrencyid] = useState()
  let[amount, setAmount] = useState()
  let[tocurrencyid, settocurrencyid] = useState()
  let[convertedamount, setconvertedamount] = useState()


  const handleConvert = async() => {

    if(!amount)
    {
      swal("Oops!", "Enter a value to continue", "error")
      return;
    } 
    let fromCurrency = fromcurrencyid ? encodeURIComponent(fromcurrencyid) : 'AED';
    let toCurrency = tocurrencyid? encodeURIComponent(tocurrencyid) : 'AED';
    var query = `${fromCurrency}_${toCurrency}` ;
    let url = 'https://free.currconv.com/api/v7/convert?q=' + query + '&compact=ultra&apiKey=a96ffd9a0755eb283446';

    let response = await axios.get(url);
    let rate = (Object.values(response.data))

    setconvertedamount(rate[0] * amount)
    
    

  }

  useEffect( async() => {

        let response = await axios.get(url)
        const object = response.data.results
        const a = Object.values(object)
        a.sort((a, b) => a.id.localeCompare(b.id))

        let currency_name = [];
        let currency_id = [];
        for (let i = 0; i < 166; i++) {
          currency_name.push(a[i].currencyName)
          currency_id.push(a[i].id)
        }
        let Currencyobject = {};
        currency_id.forEach((currency_id, i) => Currencyobject[currency_id] = currency_name[i]);


        set_currency_id_array(currency_id);
        set_currency_object_array(Currencyobject);
        
        
    },[])

  return (
    <div className="App">
      <Header/>
      <div className = 'wrapper'>
          <TextboxInput obj = {currency_object_array} idarray = {currency_id_array} setcurrencyid = {setfromcurrencyid} setAmount = {setAmount}/>
          <button className = "convert" onClick = {handleConvert}> Convert</button>
          <TextboxOutput obj = {currency_object_array} idarray = {currency_id_array} setcurrencyid = {settocurrencyid} convertedamount = {convertedamount}  />
      </div>
    

    </div>
  );
}

export default App;
