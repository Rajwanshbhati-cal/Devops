import React, { useState, useEffect } from "react";
import axios from "axios"


function App() {

    const [text, setText] = useState("");

  const [message, setMessage] = useState([]);

   async function getData() {
    try {
      const res = await axios.get("http://localhost:3000/get-names");
      setMessage(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

useEffect(() => {
  getData();
}, []);



 async function handelSubmit(){

  if(text===""){
    return;
  }
 
try {
      await axios.post("http://localhost:3000/add-names", { name: text });
      setText(""); 
      getData(); 
    } catch (err) {
      console.error("Failed to send message", err);
    }
  }


  return (
    <div>
      <h1>Node Message App</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={handelSubmit} >Send</button>
      
      <div>
        {message.map((item,index)=>{
          <li key={index} >{item}</li>
        })}
      </div>
    </div>
  );
}

export default App;
