
import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
 function App(){
   
  let [fit, setFit] = useState();
  let [inch, setInch] = useState();
  let [person, setPerson] = useState();
  let [weight, setWeight] = useState();
  let [result, setResult] = useState();
  let [status, setStatus] = useState();
  const [data,setData]=useState([])

   if(data.length<=7){
     
   }
    else{
      data.shift();
    }

   const CalculateBMI=(e)=>{
    //  if(fit==""){
    //    alert("please fill all the input feild")
    //  }
    e.preventDefault();
    
     let meters=fit*0.3048+inch*0.0254;
    let bmi =(weight /(meters*meters)).toFixed(2);
    // setData([...data,bmi])
let bmiStatus=getStatus(bmi);
    setStatus(bmiStatus);
    let person1=person.concat(" : ").concat(bmiStatus);
     let myData={
       bmi,
       person1
     }
     setData([...data,myData]);
    setResult(bmi);
    
     setFit("");
     setInch("");
     setWeight(" ");
     setPerson(" ");
   }
  
   const getStatus=(bmi)=>{
      if(bmi<18.9) return "Underweight";
      else if(bmi>=18.9 && bmi<25.4) return "Normal";
      else if(bmi>=26 && bmi<30) return "Overweight";
      else return "Obese";
   }
useEffect(()=>{
  localStorage.setItem('data',JSON.stringify(data));
},[data])
  return (
    <div>
    <div className='main-container'>
        <div className="container">
          <h2>BMI Calculator</h2>
          <form className='from-body' onSubmit={CalculateBMI}>
            <input type="text" name='name' placeholder=' Your name'
              value={person}
              onChange={(e) => setPerson(e.target.value)} required
            /><span className='span-intext'></span>
            <input type="text" name='height' placeholder=' Your Height'
              value={fit}
              onChange={(e) => setFit(e.target.value)} required
            /><span className='span-intext'>Ft</span>

            <input type="text" name='inches' placeholder='Inches'
              value={inch}
              onChange={(e) => setInch(e.target.value)} required
            /><span className='span-intext'>Inch</span>
            <input type="text" name='weight' placeholder='Your Weight'
              value={weight}
              onChange={(e) => setWeight(e.target.value)} required
            /><span className='span-intext'>Kg</span>
            <button >BMI Calculate</button>
          </form>
            <div className="result-btn">
              <p>Your BMI Is : {result}</p>
              <p>Your Currently Status : {status}</p>
            </div>
      </div>
      </div>
       <div>
         <h1 className='live-chart'>Live Chart</h1>
         <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="person1" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="bmi" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>

       </div>
     
    </div>
  );
}

export default App
