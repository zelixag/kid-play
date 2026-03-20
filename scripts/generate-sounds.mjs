import pkg from 'msedge-tts'
const { MsEdgeTTS, OUTPUT_FORMAT } = pkg
import fs from 'fs'
import path from 'path'

const VOICE = 'zh-CN-XiaoxiaoNeural'

const items = [
  { dir: 'public/sounds/animals', name: 'cat-intro', text: '这是小猫，喵喵喵！' },
  { dir: 'public/sounds/animals', name: 'dog-intro', text: '这是小狗，汪汪汪！' },
  { dir: 'public/sounds/animals', name: 'chicken-intro', text: '这是小鸡，叽叽叽！' },
  { dir: 'public/sounds/animals', name: 'cow-intro', text: '这是奶牛，哞哞哞！' },
  { dir: 'public/sounds/animals', name: 'duck-intro', text: '这是小鸭，嘎嘎嘎！' },
  { dir: 'public/sounds/animals', name: 'frog-intro', text: '这是青蛙，呱呱呱！' },
  { dir: 'public/sounds/ui', name: 'great', text: '太棒了！' },
  { dir: 'public/sounds/ui', name: 'try-again', text: '再试试看！' },
]

async function main() {
  const tts = new MsEdgeTTS()
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3)

  for (const item of items) {
    // toFile 需要目录路径，会自动生成 audio.mp3
    const tmpDir = path.join(item.dir, '_tmp_' + item.name)
    fs.mkdirSync(tmpDir, { recursive: true })

    console.log(`  ${item.text}`)
    await tts.toFile(tmpDir, item.text)

    // 把生成的 audio.mp3 重命名
    const generated = path.join(tmpDir, 'audio.mp3')
    const target = path.join(item.dir, item.name + '.mp3')
    if (fs.existsSync(generated)) {
      fs.renameSync(generated, target)
      fs.rmdirSync(tmpDir)
      const size = fs.statSync(target).size
      console.log(`  ✓ ${target} (${(size / 1024).toFixed(1)}KB)`)
    } else {
      console.log(`  ✗ Failed: ${generated} not found`)
    }
  }

  console.log('\n✅ 全部完成！')
  tts.close()
}

main().catch(console.error)
