/* CHARACTER SETS */ 
const charSet = [
"A","B","C","D","E","F","G","H","I","J","K","L","M",
"N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m",
"n","o","p","q","r","s","t","u","v","w","x","y","z" 
];
const numSet = [
"0", "1", "2", "3", "4", "5", "6", "7", "8", "9" 
];
const symbSet = [ 
"~","`","!","@","#","$","%","^","&","*","(",")","_",
"-","+","=","{","[","}","]",",","|",":",";","<",">",
".","?", "/" 
];

let useNum = true
let useSymb = true 
let passLength = 15
let passQuantity = 2
let cboard = document.querySelector("footer")

function passGen(range) {
  let stored = ""
  for (let i = 0; i < range; i++) {
    // 1d3 for deciding which set to use 
    let randPicker = Math.floor(Math.random() * 3)

    // When randPicker is 1 and useNum is enabled
    if (useNum && randPicker === 1) {
      stored += numSet[Math.floor(Math.random() * numSet.length)]
    }
    // When randPicker is 2 and useSymb is enabled
    else if (useSymb && randPicker === 2) {
      stored += symbSet[Math.floor(Math.random() * symbSet.length)]
    }
    // When randPicker is 0
    else {
      stored += charSet[Math.floor(Math.random() * charSet.length)]
    }
  }
  return stored
}

function flipNum() {
  useNum = !useNum 
}

function flipSymb() {
  useSymb = !useSymb 
}

function updateLength() {
  passLength = document.querySelector("input").value
}

function updateQuant() {
  passQuantity = document.querySelectorAll("input")[1].value
}

function passRender() {
  document.querySelector(".pass-container").innerHTML = ""

  for (let i = 0; i < passQuantity; i ++) {
    let newEl = document.createElement("p")
    newEl.textContent = passGen(passLength)
    newEl.addEventListener("click", () => { 
      navigator.clipboard.writeText(newEl.textContent);
      newEl.className = "copied"
      cboard.className = ""
      void cboard.offsetWidth;
      cboard.className = "cboard-notice"
    })
    document.querySelector(".pass-container").appendChild(newEl)
  }
}

window.addEventListener("keydown", (e) => { if (e.key === "r") { passRender() }})
