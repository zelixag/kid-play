import pkg from 'msedge-tts'
const { MsEdgeTTS, OUTPUT_FORMAT } = pkg
import fs from 'fs'
import path from 'path'

const VOICE = 'zh-CN-XiaoxiaoNeural'

const allSounds = [
  // 动物 - 新增 10 个
  { dir: 'public/sounds/animals', name: 'pig', text: '哼哼，哼哼哼！' },
  { dir: 'public/sounds/animals', name: 'pig-intro', text: '这是小猪，哼哼哼，圆圆胖胖的！' },
  { dir: 'public/sounds/animals', name: 'pig-find', text: '找到小猪在哪里？' },
  { dir: 'public/sounds/animals', name: 'rabbit', text: '蹦蹦跳跳！' },
  { dir: 'public/sounds/animals', name: 'rabbit-intro', text: '这是小兔子，蹦蹦跳，爱吃胡萝卜！' },
  { dir: 'public/sounds/animals', name: 'rabbit-find', text: '找到小兔子在哪里？' },
  { dir: 'public/sounds/animals', name: 'horse', text: '驾驾！嘶嘶！' },
  { dir: 'public/sounds/animals', name: 'horse-intro', text: '这是小马，跑得可快了！' },
  { dir: 'public/sounds/animals', name: 'horse-find', text: '找到小马在哪里？' },
  { dir: 'public/sounds/animals', name: 'sheep', text: '咩咩，咩咩咩！' },
  { dir: 'public/sounds/animals', name: 'sheep-intro', text: '这是小羊，咩咩咩，毛茸茸的！' },
  { dir: 'public/sounds/animals', name: 'sheep-find', text: '找到小羊在哪里？' },
  { dir: 'public/sounds/animals', name: 'monkey', text: '吱吱，吱吱吱！' },
  { dir: 'public/sounds/animals', name: 'monkey-intro', text: '这是小猴子，爱吃香蕉，会爬树！' },
  { dir: 'public/sounds/animals', name: 'monkey-find', text: '找到小猴子在哪里？' },
  { dir: 'public/sounds/animals', name: 'elephant', text: '嗯啊！' },
  { dir: 'public/sounds/animals', name: 'elephant-intro', text: '这是大象，鼻子长长的，好大呀！' },
  { dir: 'public/sounds/animals', name: 'elephant-find', text: '找到大象在哪里？' },
  { dir: 'public/sounds/animals', name: 'lion', text: '嗷呜！' },
  { dir: 'public/sounds/animals', name: 'lion-intro', text: '这是狮子，森林之王，好威风！' },
  { dir: 'public/sounds/animals', name: 'lion-find', text: '找到狮子在哪里？' },
  { dir: 'public/sounds/animals', name: 'panda', text: '呜呜！' },
  { dir: 'public/sounds/animals', name: 'panda-intro', text: '这是熊猫，黑白的，爱吃竹子！' },
  { dir: 'public/sounds/animals', name: 'panda-find', text: '找到熊猫在哪里？' },
  { dir: 'public/sounds/animals', name: 'fish', text: '扑通扑通！' },
  { dir: 'public/sounds/animals', name: 'fish-intro', text: '这是小鱼，在水里游来游去！' },
  { dir: 'public/sounds/animals', name: 'fish-find', text: '找到小鱼在哪里？' },
  { dir: 'public/sounds/animals', name: 'butterfly', text: '飞呀飞！' },
  { dir: 'public/sounds/animals', name: 'butterfly-intro', text: '这是蝴蝶，翅膀好漂亮！' },
  { dir: 'public/sounds/animals', name: 'butterfly-find', text: '找到蝴蝶在哪里？' },

  // 水果 - 新增 6 个
  { dir: 'public/sounds/fruits', name: 'peach', text: '桃子！' },
  { dir: 'public/sounds/fruits', name: 'peach-intro', text: '这是桃子，粉粉的，毛茸茸，甜甜的！' },
  { dir: 'public/sounds/fruits', name: 'peach-find', text: '找到桃子在哪里？' },
  { dir: 'public/sounds/fruits', name: 'pear', text: '梨子！' },
  { dir: 'public/sounds/fruits', name: 'pear-intro', text: '这是梨子，黄黄的，水水的，好好吃！' },
  { dir: 'public/sounds/fruits', name: 'pear-find', text: '找到梨子在哪里？' },
  { dir: 'public/sounds/fruits', name: 'cherry', text: '樱桃！' },
  { dir: 'public/sounds/fruits', name: 'cherry-intro', text: '这是樱桃，小小的，红红的，像宝石！' },
  { dir: 'public/sounds/fruits', name: 'cherry-find', text: '找到樱桃在哪里？' },
  { dir: 'public/sounds/fruits', name: 'pineapple', text: '菠萝！' },
  { dir: 'public/sounds/fruits', name: 'pineapple-intro', text: '这是菠萝，外面有刺，里面甜甜的！' },
  { dir: 'public/sounds/fruits', name: 'pineapple-find', text: '找到菠萝在哪里？' },
  { dir: 'public/sounds/fruits', name: 'mango', text: '芒果！' },
  { dir: 'public/sounds/fruits', name: 'mango-intro', text: '这是芒果，黄黄的，好香呀！' },
  { dir: 'public/sounds/fruits', name: 'mango-find', text: '找到芒果在哪里？' },
  { dir: 'public/sounds/fruits', name: 'lemon', text: '柠檬！' },
  { dir: 'public/sounds/fruits', name: 'lemon-intro', text: '这是柠檬，酸酸的，黄黄的！' },
  { dir: 'public/sounds/fruits', name: 'lemon-find', text: '找到柠檬在哪里？' },

  // 车标 - 12 个（全新）
  { dir: 'public/sounds/carbrands', name: 'bmw', text: '宝马！' },
  { dir: 'public/sounds/carbrands', name: 'bmw-intro', text: '这是宝马的车标，蓝白相间，像螺旋桨！' },
  { dir: 'public/sounds/carbrands', name: 'bmw-find', text: '找到宝马在哪里？' },
  { dir: 'public/sounds/carbrands', name: 'mercedes', text: '奔驰！' },
  { dir: 'public/sounds/carbrands', name: 'mercedes-intro', text: '这是奔驰的车标，三角星，好帅气！' },
  { dir: 'public/sounds/carbrands', name: 'mercedes-find', text: '找到奔驰在哪里？' },
  { dir: 'public/sounds/carbrands', name: 'audi', text: '奥迪！' },
  { dir: 'public/sounds/carbrands', name: 'audi-intro', text: '这是奥迪的车标，四个圆环连在一起！' },
  { dir: 'public/sounds/carbrands', name: 'audi-find', text: '找到奥迪在哪里？' },
  { dir: 'public/sounds/carbrands', name: 'toyota', text: '丰田！' },
  { dir: 'public/sounds/carbrands', name: 'toyota-intro', text: '这是丰田的车标，三个椭圆组成的！' },
  { dir: 'public/sounds/carbrands', name: 'toyota-find', text: '找到丰田在哪里？' },
  { dir: 'public/sounds/carbrands', name: 'volkswagen', text: '大众！' },
  { dir: 'public/sounds/carbrands', name: 'volkswagen-intro', text: '这是大众的车标，有个字母 V 和 W！' },
  { dir: 'public/sounds/carbrands', name: 'volkswagen-find', text: '找到大众在哪里？' },
  { dir: 'public/sounds/carbrands', name: 'tesla', text: '特斯拉！' },
  { dir: 'public/sounds/carbrands', name: 'tesla-intro', text: '这是特斯拉的车标，是电动汽车，好酷！' },
  { dir: 'public/sounds/carbrands', name: 'tesla-find', text: '找到特斯拉在哪里？' },
  { dir: 'public/sounds/carbrands', name: 'porsche', text: '保时捷！' },
  { dir: 'public/sounds/carbrands', name: 'porsche-intro', text: '这是保时捷的车标，中间有一匹马！' },
  { dir: 'public/sounds/carbrands', name: 'porsche-find', text: '找到保时捷在哪里？' },
  { dir: 'public/sounds/carbrands', name: 'ferrari', text: '法拉利！' },
  { dir: 'public/sounds/carbrands', name: 'ferrari-intro', text: '这是法拉利的车标，有一匹跳起来的马！' },
  { dir: 'public/sounds/carbrands', name: 'ferrari-find', text: '找到法拉利在哪里？' },
  { dir: 'public/sounds/carbrands', name: 'lamborghini', text: '兰博基尼！' },
  { dir: 'public/sounds/carbrands', name: 'lamborghini-intro', text: '这是兰博基尼的车标，有一头金色的牛！' },
  { dir: 'public/sounds/carbrands', name: 'lamborghini-find', text: '找到兰博基尼在哪里？' },
  { dir: 'public/sounds/carbrands', name: 'honda', text: '本田！' },
  { dir: 'public/sounds/carbrands', name: 'honda-intro', text: '这是本田的车标，一个大大的字母 H！' },
  { dir: 'public/sounds/carbrands', name: 'honda-find', text: '找到本田在哪里？' },
  { dir: 'public/sounds/carbrands', name: 'nissan', text: '日产！' },
  { dir: 'public/sounds/carbrands', name: 'nissan-intro', text: '这是日产的车标，圆圆的，中间写着名字！' },
  { dir: 'public/sounds/carbrands', name: 'nissan-find', text: '找到日产在哪里？' },
  { dir: 'public/sounds/carbrands', name: 'ford', text: '福特！' },
  { dir: 'public/sounds/carbrands', name: 'ford-intro', text: '这是福特的车标，蓝色的椭圆形！' },
  { dir: 'public/sounds/carbrands', name: 'ford-find', text: '找到福特在哪里？' },
]

async function main() {
  const tts = new MsEdgeTTS()
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3)

  let count = 0
  for (const item of allSounds) {
    fs.mkdirSync(item.dir, { recursive: true })
    const target = path.join(item.dir, item.name + '.mp3')
    if (fs.existsSync(target)) { continue }

    const tmpDir = path.join(item.dir, '_tmp_' + item.name)
    fs.mkdirSync(tmpDir, { recursive: true })
    console.log(`  [${++count}] ${item.text}`)
    await tts.toFile(tmpDir, item.text)
    fs.renameSync(path.join(tmpDir, 'audio.mp3'), target)
    fs.rmdirSync(tmpDir)
  }

  console.log(`\n✅ 生成 ${count} 个新音效！`)
  tts.close()
}

main().catch(console.error)
