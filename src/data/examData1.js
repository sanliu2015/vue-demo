/**
 * @param {Number} examTime 考试时长
 * @param {String} title 题目内容
 * @param {Array} options 答案选项
 * @param {Number} answer 正确答案索引，从0开始
 * @param {Number} score 题目对应的分数
 * @param {String} examId 题目唯一ID
 */

export const examTime = 30;

export const examList = [
  {
    title: "《春晓》这首诗是出自哪位诗人？",
    options: ["李白", "杜甫", "王维", "苏轼"],
    answer: 3,
    score: 20,
    examId: "0"
  },
  {
    title: "下面哪些人物是《三国演义》中的人物？",
    options: ["张飞", "李逵", "关羽", "吕布"],
    answer: [1, 3, 4],
    score: 30,
    examId: "0"
  },
  {
    title: "“横看成岭侧成峰，远近高低各不同”，这两句诗描写的名胜景点是？",
    options: ["华山", "泰山", "庐山", "三清山"],
    answer: 3,
    score: 50,
    examId: "1"
  }
];
