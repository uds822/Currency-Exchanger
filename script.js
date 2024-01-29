const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
   

  const hero=document.querySelectorAll(".hero select");
  const btn=document.querySelector(".btn");
  const fromcurr=document.querySelector(".from select");
  const tocurr=document.querySelector(".to select");
  const msg=document.querySelector(".msg");
  for(let select of hero){
  for(code in countryList){
    let newoption=document.createElement("option");
    newoption.innerHTML=code;
    newoption.value=code;
    if(select.name==="from" && code === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && code === "INR"){
      newoption.selected = "selected";
    }
    select.append(newoption);
  }

select.addEventListener("change",(evt) => {
          upadateflag(evt.target);
});
}
const upadateflag=(element)=>{
      let code=element.value;
      let countrycode=countryList[code];
      let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
      let img = element.parentElement.querySelector("img");
      img.src=newsrc;
}
const currencyexchange= async (evt)=>{
  let amt=document.querySelector(".amount input");
  let amtval=amt.value;
  if(amtval=="" && amtval<0){
    amtval=1;
    amt.value="1";
  }
  const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;

  let response  =  await fetch(URL);
  let data= await response.json();
  
  let rate= data[tocurr.value.toLowerCase()];
  let amount=rate*amt.value;
  msg.innerHTML =`1${fromcurr.value} = ${amount} ${tocurr.value}`;
}
btn.addEventListener("click",(evt) => {
  evt.preventDefault();
  currencyexchange();
})

window.addEventListener("load", (evt) => {
  currencyexchange();
  evt.preventDefault();

});
