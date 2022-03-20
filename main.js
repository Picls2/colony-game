//Declaring Variables

//Accessing DOM elements and storing them
//News stuff
const headLine = document.getElementById("newsHeadline");
const subLine = document.getElementById("newsInfo");

//Resources and colonist counts
const moneyCount = document.getElementById("money");
const wheatCount = document.getElementById("wheat");
const stoneCount = document.getElementById("stone");
const ironCount = document.getElementById("iron");
const colonistsText = document.getElementById("totalColonists");
const unemployedText = document.getElementById("unemployed");
const soldiersText = document.getElementById("soldiers");
const farmersText = document.getElementById("farmers");
const stoneMinerText = document.getElementById("stoneMiners");
const ironMinerText = document.getElementById("ironMiners");

//Employment Buttons
const soldierPlus = document.getElementById("soldierPlus");
const soldierMinus = document.getElementById("soldierMinus");
const farmerPlus = document.getElementById("farmerPlus");
const farmerMinus = document.getElementById("farmerMinus");
const stoneMinerPlus = document.getElementById("stoneMinerPlus");
const stoneMinerMinus = document.getElementById("stoneMinerMinus");
const ironMinerPlus = document.getElementById("ironMinerPlus");
const ironMinerMinus = document.getElementById("ironMinerMinus");

//Market Inputs
const wheatSell = document.getElementById("wheatSell");
const stoneSell = document.getElementById("stoneSell");
const ironSell = document.getElementById("ironSell");
const colonistBuy = document.getElementById("colonistBuy");
const wheatSellButton = document.getElementById("wheatSellButton");
const stoneSellButton = document.getElementById("stoneSellButton");
const ironSellButton = document.getElementById("ironSellButton");
const colonistBuyButton = document.getElementById("colonistBuyButton");

//Upgrade Texts
const soldierUpgrade = document.getElementById("soldierUpgrade");
const soldierUpgradeButton = document.getElementById("soldierUpgradeButton");
const farmerUpgrade = document.getElementById("farmerUpgrade");
const farmerUpgradeButton = document.getElementById("farmerUpgradeButton");
const stoneUpgrade = document.getElementById("stoneUpgrade");
const stoneUpgradeButton = document.getElementById("stoneUpgradeButton");
const ironUpgrade = document.getElementById("ironUpgrade");
const ironUpgradeButton = document.getElementById("ironUpgradeButton");

//Statistics Elements
const soldierDamage = document.getElementById("soldierDamage");
const farmerSpeed = document.getElementById("farmerSpeed");
const stoneMinerSpeed = document.getElementById("stoneMinerSpeed");
const ironMinerSpeed = document.getElementById("ironMinerSpeed");

//Statistics Variables
let colonists = 10;
let soldiers = 0;
let farmers = 0;
let stoneMiners = 0; 
let ironMiners = 0; 
let money = 0;
let wheat = 0; 
let stone = 0;
let iron = 0;
let unemployed = colonists - soldiers - farmers - stoneMiners - ironMiners;

//Multipliers
let soldierMultiplier = 3;
let wheatMultiplier = 0.5;
let stoneMultiplier = 0.2;
let ironMultiplier = 0.1;

//Upgrade values
let soldierCost = 1000;
let farmerCost = 1000;
let stoneMinerCost = 5000;
let ironMinerCost = 10000;

//Keep DOM numbers upodated
function updateDOM() {
    moneyCount.innerHTML = `Money: ${money}`;
    wheatCount.innerHTML = `Wheat: ${Math.floor(wheat)}`;
    stoneCount.innerHTML = `Stone: ${Math.floor(stone)}`;
    ironCount.innerHTML = `Iron: ${Math.floor(iron)}`;
    colonistsText.innerHTML = `Total Colonists: ${colonists}`;
    soldiersText.innerHTML = `Soldiers: ${soldiers}`;
    farmersText.innerHTML = `Farmers: ${farmers}`;
    stoneMinerText.innerHTML = `Stone Miners: ${stoneMiners}`;
    ironMinerText.innerHTML = `Iron Miners: ${ironMiners}`;
    unemployedText.innerHTML = `Unemployed: ${unemployed}`;
    soldierDamage.innerHTML = `Soldier Damage: ${soldierMultiplier}`;
    farmerSpeed.innerHTML = `Farmer Speed: ${wheatMultiplier}`;
    stoneMinerSpeed.innerHTML = `Stone Miner Speed: ${stoneMultiplier}`;
    ironMinerSpeed.innerHTML = `Iron Miner Speed: ${ironMultiplier}`;
    soldierUpgrade.innerHTML = `Soldier thing thing: <br /> $${soldierCost}`
    farmerUpgrade.innerHTML = `Farmer Speed +20%: <br /> $${farmerCost}`
    stoneUpgrade.innerHTML = `Stone Miner Speed +50%: <br /> $${stoneMinerCost}`
    ironUpgrade.innerHTML = `Iron Miner Speed +100%: <br /> $${ironMinerCost}`
}

window.onload = () => {
    setInterval(() => {
        updateDOM();
        checkUnlock();
    }, 10)

    setInterval(() => {
        resourceProduction();
    }, 3000)
}

//Employment Buttons
soldierPlus.onclick = () => {
    if(unemployed > 0){
        soldiers++;
        unemployed--;
    }
} 

soldierMinus.onclick = () => {
    if(soldiers > 0){
        soldiers--;
        unemployed++;
    }
}

farmerPlus.onclick = () => {
    if(unemployed > 0){
        farmers++;
        unemployed--;
    }
}

farmerMinus.onclick = () => {
    if(farmers > 0){
        farmers--;
        unemployed++;
    }
}

stoneMinerPlus.onclick = () => {
    if(unemployed > 0){
        stoneMiners++;
        unemployed--;
    }
}

stoneMinerMinus.onclick = () => {
    if(stoneMiners > 0){
        stoneMiners--;
        unemployed++;
    }
}

ironMinerPlus.onclick = () => {
    if(unemployed > 0){
        ironMiners++;
        unemployed--;
    }
}

ironMinerMinus.onclick = () => {
    if(ironMiners > 0){
        ironMiners--;
        unemployed++;
    }
}

//Resource Production
function resourceProduction() {
    wheat += farmers * wheatMultiplier;
    stone += stoneMiners * stoneMultiplier;
    iron += ironMiners * ironMultiplier;
}

//Market Functions
wheatSellButton.onclick = () => {
    if(wheatSell.value <= wheat){
        wheat -= wheatSell.value;
        money += wheatSell.value * 2;
    } else {
        alert("Insufficient Resources");
    }
}

stoneSellButton.onclick = () => {
    if(stoneSell.value <= stone){
        stone -= stoneSell.value;
        money += stoneSell.value * 5;
    } else {
        alert("Insufficient Resources");
    }
}

ironSellButton.onclick = () => {
    if(ironSell.value <= iron){
        iron -= ironSell.value;
        money += ironSell.value * 10;
    } else {
        alert("Insufficient Resources");
    }
}

colonistBuyButton.onclick = () => {
    if(parseFloat(colonistBuy.value) * 100 <= money){
        money -= parseFloat(colonistBuy.value) * 100;
        colonists += parseFloat(colonistBuy.value);
        unemployed = colonists - soldiers - farmers - stoneMiners - ironMiners;
    } else {
        alert("Insufficient Funds");
    }
}

//Check if stone and iron are unlocked
function checkUnlock(){
    if(colonists >= 50){
        stoneMinerPlus.removeAttribute("disabled");
        stoneMinerMinus.removeAttribute("disabled");
        stoneSell.removeAttribute("disabled");
        stoneSellButton.removeAttribute("disabled");
        stoneUpgradeButton.removeAttribute("disabled");
    }

    if(colonists >= 100){
        ironMinerPlus.removeAttribute("disabled");
        ironMinerMinus.removeAttribute("disabled");
        ironSell.removeAttribute("disabled");
        ironSellButton.removeAttribute("disabled");
        ironUpgradeButton.removeAttribute("disabled");
    }
}

//Upgrade Functions 
farmerUpgradeButton.onclick = () => {
    if(money >= farmerCost){
        money -= farmerCost;
        farmerCost *= 1.5;
        farmerSpeed *= 1.2;
    } else {
        alert("Insufficient Funds")
    }
}

stoneUpgradeButton.onclick = () => {
    if(money >= stoneMinerCost){
        money -= stoneMinerCost;
        stoneMinerCost *= 1.5;
        stoneMinerSpeed *= 1.5;
    } else {
        alert("Insufficient Funds")
    }
}

ironUpgradeButton.onclick = () => {
    if(money >= ironMinerCost){
        money -= ironMinerCost;
        ironMinerCost *= 1.5;
        ironMinerSpeed *= 2;
    } else {
        alert("Insufficient Funds")
    }
}