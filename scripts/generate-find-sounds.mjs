import pkg from 'msedge-tts'
const { MsEdgeTTS, OUTPUT_FORMAT } = pkg
import fs from 'fs'
import path from 'path'

const VOICE = 'zh-CN-XiaoxiaoNeural'

const findSounds = [
  // 动物
  { dir: 'public/sounds/animals', name: 'cat-find', text: '找到小猫在哪里？' },
  { dir: 'public/sounds/animals', name: 'dog-find', text: '找到小狗在哪里？' },
  { dir: 'public/sounds/animals', name: 'chicken-find', text: '找到小鸡在哪里？' },
  { dir: 'public/sounds/animals', name: 'cow-find', text: '找到奶牛在哪里？' },
  { dir: 'public/sounds/animals', name: 'duck-find', text: '找到小鸭在哪里？' },
  { dir: 'public/sounds/animals', name: 'frog-find', text: '找到青蛙在哪里？' },
  // 水果
  { dir: 'public/sounds/fruits', name: 'apple-find', text: '找到苹果在哪里？' },
  { dir: 'public/sounds/fruits', name: 'banana-find', text: '找到香蕉在哪里？' },
  { dir: 'public/sounds/fruits', name: 'watermelon-find', text: '找到西瓜在哪里？' },
  { dir: 'public/sounds/fruits', name: 'strawberry-find', text: '找到草莓在哪里？' },
  { dir: 'public/sounds/fruits', name: 'orange-find', text: '找到橙子在哪里？' },
  { dir: 'public/sounds/fruits', name: 'grape-find', text: '找到葡萄在哪里？' },
  // 交通
  { dir: 'public/sounds/vehicles', name: 'car-find', text: '找到小汽车在哪里？' },
  { dir: 'public/sounds/vehicles', name: 'bus-find', text: '找到公交车在哪里？' },
  { dir: 'public/sounds/vehicles', name: 'train-find', text: '找到火车在哪里？' },
  { dir: 'public/sounds/vehicles', name: 'airplane-find', text: '找到飞机在哪里？' },
  { dir: 'public/sounds/vehicles', name: 'ship-find', text: '找到轮船在哪里？' },
  { dir: 'public/sounds/vehicles', name: 'firetruck-find', text: '找到消防车在哪里？' },
  // 形状
  { dir: 'public/sounds/shapes', name: 'red-circle-find', text: '找到红色圆形在哪里？' },
  { dir: 'public/sounds/shapes', name: 'blue-square-find', text: '找到蓝色方块在哪里？' },
  { dir: 'public/sounds/shapes', name: 'yellow-star-find', text: '找到黄色星星在哪里？' },
  { dir: 'public/sounds/shapes', name: 'green-diamond-find', text: '找到绿色圆形在哪里？' },
  { dir: 'public/sounds/shapes', name: 'purple-heart-find', text: '找到紫色爱心在哪里？' },
  { dir: 'public/sounds/shapes', name: 'orange-triangle-find', text: '找到橙色三角在哪里？' },
]

async function main() {
  const tts = new MsEdgeTTS()
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3)

  let count = 0
  for (const item of findSounds) {
    fs.mkdirSync(item.dir, { recursive: true })
    const target = path.join(item.dir, item.name + '.mp3')
    if (fs.existsSync(target)) { console.log(`  skip ${target}`); continue }

    const tmpDir = path.join(item.dir, '_tmp_' + item.name)
    fs.mkdirSync(tmpDir, { recursive: true })
    console.log(`  [${++count}] ${item.text}`)
    await tts.toFile(tmpDir, item.text)
    fs.renameSync(path.join(tmpDir, 'audio.mp3'), target)
    fs.rmdirSync(tmpDir)
  }

  console.log(`\n✅ 生成 ${count} 个找一找语音！`)
  tts.close()
}

main().catch(console.error)
