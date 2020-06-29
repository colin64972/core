const reMerge = (left, right, field, direction) => {
  let result = [],
    leftIndex = 0,
    rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    let leftOpponent = left[leftIndex]
    let rightOpponent = right[rightIndex]

    if (field) {
      leftOpponent = leftOpponent[field]
      rightOpponent = rightOpponent[field]
    }

    if (direction === 'up') {
      if (leftOpponent < rightOpponent) {
        result.push(left[leftIndex])
        leftIndex += 1
      } else {
        result.push(right[rightIndex])
        rightIndex += 1
      }
    } else {
      if (leftOpponent > rightOpponent) {
        result.push(left[leftIndex])
        leftIndex += 1
      } else {
        result.push(right[rightIndex])
        rightIndex += 1
      }
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

// modified from medium.com/javascript-in-plain-english/javascript-merge-sort-3205891ac060
export const mergeSort = (input = [], field = null, direction = 'up') => {
  if (input.length < 2) return input

  const middle = Math.floor(input.length / 2)
  const left = input.slice(0, middle)
  const right = input.slice(middle)

  return reMerge(mergeSort(left), mergeSort(right), field, direction)
}
