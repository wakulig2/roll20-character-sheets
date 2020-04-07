
const processingFunctions = {
  convertIntegerNegative: number => number > 0 ? -Math.abs(number) : number,
  convertIntegersNegatives: numbers => {
    for (let [key, value] of Object.entries(numbers)) {
      numbers[key] = processingFunctions.convertIntegerNegative(value);
    }
    return numbers
  },
  findRepeatingField: trigger => trigger.split('_')[1],
  //Roll20 does not allow for Promises
  //getAttributes: array => new Promise((resolve, reject) => array ? getAttrs(array, v => resolve(v)) : reject(errorMessage('Function failed'))),
  getReprowid: trigger => {
    const split = trigger.split('_');
    return `${split[0]}_${split[1]}_${split[2]}`
  },
  getReprowAttribute: key => {
    const getReprowid = processingFunctions.getReprowid(key)
    return key.split(`${getReprowid}_`)[1]
  },
  getTranslations: translationKeys => {
    let translations = {}
    translationKeys.forEach(key => translations[`${key}`] = getTranslationByKey(key))
    return translations
  },
  parseInteger: string => parseInt(string) || 0,
  parseIntegers: numbers => {
    for (let [key, value] of Object.entries(numbers)) {
        numbers[key] = parseInt(value) || 0;
    }
    return numbers  
  },
  setAttributes: (update, silent) => silent && typeof update === 'object' ? setAttrs(update, {silent:true}) : typeof update === 'object' ? setAttrs(update) : console.error(`${update} is not an object`),
  sliceAttr: attribute => attribute.slice(2, -1), 
  sumIntegers: numbers => numbers.reduce((a,b) => a + b, 0),
}
