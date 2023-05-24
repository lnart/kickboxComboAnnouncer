import combis from "./comboController"

export function createResult(req, res){
    const result = []
    const obj = req.body
    delete obj.minutes
    const length = Object.keys(obj).length
    for(const key in obj){
        if(obj.hasOwnProperty(key)){
            const value = obj[key]
            result.push({
                combo: value,
                probability: combis[value]['probabilities'][length]
            })
        }
    }
    return result
}

export function addCombosRandomly(data, numCombosToAdd) {
    // Calculate cumulative probabilities
    let cumulativeProbabilities = [];
    let cumulativeProbability = 0;
    for (let i = 0; i < data.length; i++) {
      cumulativeProbability += data[i].probability;
      cumulativeProbabilities.push(cumulativeProbability);
    }
  
    // Add combos randomly
    let addedCombos = [];
    for (let i = 0; i < numCombosToAdd; i++) {
      const random = Math.random();
      let selectedCombo = null;
  
      // Find the combo based on the random number
      for (let j = 0; j < data.length; j++) {
        if (random < cumulativeProbabilities[j]) {
          selectedCombo = data[j].combo;
          break;
        }
      }
  
      // Add the selected combo to the array
      addedCombos.push(selectedCombo);
    }
  
    return addedCombos;
  }