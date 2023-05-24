import combis from "./comboController";


export function createArrayOfCombos(requestBody) {
  const arrayOfComboObjects = [];
  delete requestBody.minutes;
  const length = Object.keys(requestBody).length;
  for (const key in requestBody) {
    if (requestBody.hasOwnProperty(key)) {
      const value = requestBody[key];
      arrayOfComboObjects.push({
        combo: value,
        probability: combis[value]["probabilities"][length],
      });
    }
  }
  return arrayOfComboObjects;
}

export function addCombosRandomly(arrayOfComboObjects, numCombosToAdd:number){
  const cumulativeProbabilities = calculateCumulativeProbabilities(arrayOfComboObjects);

  const addedCombos = []

  for (let i = 0; i < numCombosToAdd; i++) {
    const selectedCombo = selectComboRandomly(arrayOfComboObjects, cumulativeProbabilities);
    addedCombos.push(selectedCombo);
  }

  return addedCombos;

}


function calculateCumulativeProbabilities(arrayOfComboObjects) {
  let cumulativeProbabilities = [];
  let cumulativeProbability = 0;
  for (let i = 0; i < arrayOfComboObjects.length; i++) {
    cumulativeProbability += arrayOfComboObjects[i].probability;
    cumulativeProbabilities.push(cumulativeProbability);
  }
  return cumulativeProbabilities;
}


function selectComboRandomly(arrayOfComboObjects, cumulativeProbabilities) {
  const random = Math.random();
  let selectedCombo = null;

  for (let j = 0; j < arrayOfComboObjects.length; j++) {
    if (random < cumulativeProbabilities[j]) {
      selectedCombo = arrayOfComboObjects[j].combo;
      break;
    }
  }

  return selectedCombo;
}

