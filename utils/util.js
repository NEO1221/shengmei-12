const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const combination = function combination(arr, k) {
  let result = [];
  function helper(temp, start) {
    if (temp.length === k) {
      result.push(temp.slice()); // 将结果存储到 result 数组中
      return;
    }
    for (let i = start; i < arr.length; i++) {
      temp.push(arr[i]);
      helper(temp, i + 1);
      temp.pop();
    }
  }
  helper([], 0);
  return result;
}

module.exports = {
  formatTime,combination
}
