import React,{useState,useEffect} from 'react';
import axios from 'axios';

function App() {
  const [user,setUser]=useState([])
  
  useEffect(()=>{
    getData();
  },[]);
 
  let getData=async ()=>{
                          var d = await axios.get('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');
                          // console.log(d.data);
                          setUser(d.data);
                        }
  let [value,setvalue]=useState(0);
 
  let pageno=[];
  let pageSize=10;
  
  let pageNumber=()=>{
  for(let i=0;i<user.length;i=i+10)
      {
        // console.log(i/10 + 1);
        let k=i/pageSize + 1;
        pageno.push(k);
      }}
   pageNumber();   
  if(user.length>0)
 {
   
   let upto=value+pageSize;
  

   let val1=user.slice(value,upto);
  return (
    <>
    <table>
  <thead>
    <tr>
      <th >id</th>
      <th >name</th>
      <th >email</th>
      
    </tr>
  </thead>
  <tbody>
    {val1.map((e,i)=>{
      return <tr key={i}>
      <td >{e.id}</td>
      <td>{e.name}</td>
      <td>{e.email}</td> 
    </tr>
    })}
  </tbody>
</table>
<nav>
    <ul class="pagination">
        {/* previous button*/}
        <li class="page-item"><a class="page-link" onClick={()=>setvalue((prev)=>{
                                                                                  if(prev>0)
                                                                                  {
                                                                                    return prev-=pageSize;
                                                                                  }
                                                                                  else{
                                                                                    return 0;
                                                                                  }})
                                                                                  }>Previous</a></li>
      {/* function for page number */}
        {
          pageno.map((e,i)=>{
            return  <li class="page-item"><a class="page-link" onClick={()=>{
                                                                              // console.log(e);
                                                                              let page=(e-1)*pageSize;
                                                                              // console.log(page);
                                                                              setvalue(page);
                                                                              }} key={i}>{e}</a></li>
          })
        }
      {/* Next button*/}
        <li class="page-item"><a class="page-link" onClick={()=>setvalue((prev)=>{
                                                                                  if(prev<(user.length-pageSize))
                                                                                  {
                                                                                    // console.log(prev)
                                                                                    return prev+=pageSize;
                                                                                  }
                                                                                  else{
                                                                                    return user.length-pageSize;
                                                                                  }
                                                                                })}>Next</a></li>
    </ul>
</nav>
    </>
  )}
  else{
    return <></>;
  }
}

export default App;



