const apiUrl = `http://209.126.6.169:8182/api/GptPlayground/GetPlaygroundById/`;


export const getPlayGroundSetting =( uid : string) => {
    if(process.env.GPT_Modle){
        return process.env.GPT_Modle;
    }
    console.log("API CALL----")
    // Make the API request to get the data
return fetch (apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        },
    body:JSON.stringify({userId:uid})
    })
    .then(
        response => response.json() 
        )  .then(data => {
            process.env['GPT_Modle']=data;
            return data;
        });
  
    // console.log("DATA----")
    // console.log({res})
   
    // const data = await res;
//    return res;
console.log(process.env.GPT_Modle)
}
