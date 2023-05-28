import { speck } from "ttspeech";

async function main() {
  await speck("家人们谁懂啊，这也太好玩了吧！");
}

(async () => {
  console.log("开始念。。。");
  await main();
  console.log("念完了");
})();
