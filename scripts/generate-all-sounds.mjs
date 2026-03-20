import pkg from 'msedge-tts'
const { MsEdgeTTS, OUTPUT_FORMAT } = pkg
import fs from 'fs'
import path from 'path'

const VOICE = 'zh-CN-XiaoxiaoNeural'

const allSounds = [
  // 水果 - 叫声（名称）
  { dir: 'public/sounds/fruits', name: 'apple', text: '苹果！红红的苹果！' },
  { dir: 'public/sounds/fruits', name: 'banana', text: '香蕉！弯弯的香蕉！' },
  { dir: 'public/sounds/fruits', name: 'watermelon', text: '西瓜！大大的西瓜！' },
  { dir: 'public/sounds/fruits', name: 'strawberry', text: '草莓！甜甜的草莓！' },
  { dir: 'public/sounds/fruits', name: 'orange', text: '橙子！圆圆的橙子！' },
  { dir: 'public/sounds/fruits', name: 'grape', text: '葡萄！一串葡萄！' },
  // 水果 - 语音介绍
  { dir: 'public/sounds/fruits', name: 'apple-intro', text: '这是苹果，红红的，甜甜的，真好吃！' },
  { dir: 'public/sounds/fruits', name: 'banana-intro', text: '这是香蕉，弯弯的，黄黄的，像月亮！' },
  { dir: 'public/sounds/fruits', name: 'watermelon-intro', text: '这是西瓜，圆圆的，绿绿的，里面是红色的！' },
  { dir: 'public/sounds/fruits', name: 'strawberry-intro', text: '这是草莓，小小的，红红的，酸酸甜甜！' },
  { dir: 'public/sounds/fruits', name: 'orange-intro', text: '这是橙子，圆圆的，橙色的，酸酸甜甜！' },
  { dir: 'public/sounds/fruits', name: 'grape-intro', text: '这是葡萄，一颗一颗的，紫紫的，真好吃！' },

  // 交通工具 - 声音
  { dir: 'public/sounds/vehicles', name: 'car', text: '嘀嘀！嘀嘀嘀！' },
  { dir: 'public/sounds/vehicles', name: 'bus', text: '嘟嘟！公交车来啦！' },
  { dir: 'public/sounds/vehicles', name: 'train', text: '呜呜！咔嚓咔嚓！' },
  { dir: 'public/sounds/vehicles', name: 'airplane', text: '嗡嗡嗡！飞机飞上天！' },
  { dir: 'public/sounds/vehicles', name: 'ship', text: '呜！轮船开啦！' },
  { dir: 'public/sounds/vehicles', name: 'firetruck', text: '呜哇呜哇！消防车出动！' },
  // 交通工具 - 语音介绍
  { dir: 'public/sounds/vehicles', name: 'car-intro', text: '这是小汽车，嘀嘀嘀，在马路上跑！' },
  { dir: 'public/sounds/vehicles', name: 'bus-intro', text: '这是公交车，嘟嘟嘟，带大家去上班！' },
  { dir: 'public/sounds/vehicles', name: 'train-intro', text: '这是火车，呜呜呜，在铁轨上跑得快！' },
  { dir: 'public/sounds/vehicles', name: 'airplane-intro', text: '这是飞机，嗡嗡嗡，飞到天上去啦！' },
  { dir: 'public/sounds/vehicles', name: 'ship-intro', text: '这是轮船，在大海上航行，好大呀！' },
  { dir: 'public/sounds/vehicles', name: 'firetruck-intro', text: '这是消防车，呜哇呜哇，去救火啦！' },

  // 颜色形状 - 名称
  { dir: 'public/sounds/shapes', name: 'red-circle', text: '红色！圆形！' },
  { dir: 'public/sounds/shapes', name: 'blue-square', text: '蓝色！方块！' },
  { dir: 'public/sounds/shapes', name: 'yellow-star', text: '黄色！星星！' },
  { dir: 'public/sounds/shapes', name: 'green-diamond', text: '绿色！圆形！' },
  { dir: 'public/sounds/shapes', name: 'purple-heart', text: '紫色！爱心！' },
  { dir: 'public/sounds/shapes', name: 'orange-triangle', text: '橙色！三角形！' },
  // 颜色形状 - 语音介绍
  { dir: 'public/sounds/shapes', name: 'red-circle-intro', text: '这是红色的圆形，圆圆的，像太阳！' },
  { dir: 'public/sounds/shapes', name: 'blue-square-intro', text: '这是蓝色的方块，方方正正的！' },
  { dir: 'public/sounds/shapes', name: 'yellow-star-intro', text: '这是黄色的星星，一闪一闪亮晶晶！' },
  { dir: 'public/sounds/shapes', name: 'green-diamond-intro', text: '这是绿色的圆形，绿绿的，像小草！' },
  { dir: 'public/sounds/shapes', name: 'purple-heart-intro', text: '这是紫色的爱心，代表爱你哦！' },
  { dir: 'public/sounds/shapes', name: 'orange-triangle-intro', text: '这是橙色的三角形，尖尖的，像小山！' },

  // 找一找模式的提示语音
  { dir: 'public/sounds/ui', name: 'find-prompt', text: '找一找！' },
]

async function main() {
  const tts = new MsEdgeTTS()
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3)

  let count = 0
  for (const item of allSounds) {
    fs.mkdirSync(item.dir, { recursive: true })
    const tmpDir = path.join(item.dir, '_tmp_' + item.name)
    fs.mkdirSync(tmpDir, { recursive: true })

    const target = path.join(item.dir, item.name + '.mp3')
    if (fs.existsSync(target)) {
      console.log(`  skip ${target}`)
      fs.rmdirSync(tmpDir)
      continue
    }

    console.log(`  [${++count}/${allSounds.length}] ${item.text}`)
    await tts.toFile(tmpDir, item.text)
    fs.renameSync(path.join(tmpDir, 'audio.mp3'), target)
    fs.rmdirSync(tmpDir)
  }

  console.log(`\n✅ 生成 ${count} 个新音效文件！`)
  tts.close()
}

main().catch(console.error)
