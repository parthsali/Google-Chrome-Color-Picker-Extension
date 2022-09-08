const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid")
const colorValue = document.querySelector(".colorValue");
const copy = document.querySelector(".copy");



btn.addEventListener("click", async () => {
   let [tab] = await chrome.tabs.query({active : true, currentWindow: true});
   console.log(tab);

   chrome.scripting.executeScript({
    target : {tabId: tab.id},
    function : pickColor,
   }, async(injectionResults) => {
    const [data] = injectionResults;
    if(data.result){
        const color = data.result.sRGBHex;
        colorGrid.style.background = color;
        colorValue.innerText = color;
        copy.addEventListener("click" , async() => {
            try {
                await navigator.clipboard.writeText(color);
               } catch (error) {
                   console.log(error);
               }
        })
       
        copy.style.display = "block";
        console.log(colorGrid);
    }
    
   });
});

async function  pickColor(){
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
        
    } catch (err) {
        console.log(err);
    }
}