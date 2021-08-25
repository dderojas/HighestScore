const fs = require('fs');

const findHighestScore = (param, n) => {
  fs.readFile(param, 'utf-8', (err, jsonString) => {
    if(err) {
      console.log(err)
    } else {
      try {
        const data = JSON.parse(jsonString)

        for (const val in data) {
          if (typeof data[val] !== 'object' || !data[val].hasOwnProperty('id')) {
            throw new Error('one of the items is not a JSON object or does not have an id property')
          }
        }
        highestScoreFunc(data, n)
      }
      catch(e) {
        console.log(e);
      }
    }
  })
}

const highestScoreFunc = (data, n) => {
  const arr = Object.keys(data).sort((a, b) => b - a);
  const results = []

  for (let i = 0; i < arr.length; i++) {
    if (results.length === n) break;
    if (arr[i] === arr[i + 1]) continue;

    const val = arr[i];

    results.push({ score: parseInt(val), id: data[val].id}) 
  }

  console.log(JSON.stringify(results))
  return 'success';
}

const params = process.argv.slice(2)
console.log(params)
findHighestScore(params[0], params[1])