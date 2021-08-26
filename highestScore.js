const fs = require('fs');


const findHighestScoreTWO = (param, n) => {
  try {
    let stream = fs.createReadStream(param)
    stream.on('data', (dataChunk) => {
      const stringData = dataChunk.toString().split('\r\n').map((elem) => {
        // checking for non JSON format and ID
        const elemArr = elem.split(':')
        const scoreLength = elemArr[0].length
        const jsonObj = JSON.parse(elemArr.join(':').slice(scoreLength + 2))
        
        if (typeof jsonObj !== 'object' && !jsonObj.hasOwnProperty('id')) throw new Error('one of the items is not a JSON object or does not have an id property')
        return elem
      })

      highestScoreFuncTWO(stringData, n)
    })
  }
  catch(e) {
    console.log(e)
  }
}

const highestScoreFuncTWO = (data, n) => {
  // sort highest score
  const arr = data.sort((a, b) => {
    return b.split(':')[0] - a.split(':')[0]
  })

  const results = []

  for (let i = 0; i < arr.length; i++) {
    if (results.length === n) break;
    if (arr[i].split(':')[0] === arr[i + 1]?.split(':')[0]) continue;

    const scoreArr = arr[i].split(':')
    const score = scoreArr[0]
    const jsonObj = scoreArr.join(':').slice(score.length + 2)
    const id = JSON.parse(jsonObj)['id']

    results.push({ score: parseInt(score), id })
  }
  console.log(results, 'success')
  return 'success';
}

const params = process.argv.slice(2)
console.log(params)

findHighestScoreTWO(params[0], params[1])