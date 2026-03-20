import pkg from 'msedge-tts'
const { MsEdgeTTS, OUTPUT_FORMAT } = pkg
import fs from 'fs'
import path from 'path'

const VOICE = 'zh-CN-XiaoxiaoNeural'
const DIR = 'public/sounds/animals'

// 用拟声词模拟动物叫声
const sounds = [
  { name: 'cat', text: '喵，喵喵！' },
  { name: 'dog', text: '汪汪，汪汪汪！' },
  { name: 'chicken', text: '咯咯咯，咯咯哒！' },
  { name: 'cow', text: '哞，哞哞！' },
  { name: 'duck', text: '嘎嘎，嘎嘎嘎！' },
  { name: 'frog', text: '呱呱，呱呱呱！' },
]

// UI 点击音效也用语音代替
const uiSounds = [
  { dir: 'public/sounds/ui', name: 'click', text: '嘀！' },
  { dir: 'public/sounds/ui', name: 'success', text: '叮咚！答对啦！' },
  { dir: 'public/sounds/ui', name: 'celebrate', text: '耶！太厉害了！' },
]

async function main() {
  const tts = new MsEdgeTTS()
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3)

  console.log('=== 动物叫声 ===')
  for (const item of sounds) {
    const tmpDir = path.join(DIR, '_tmp_' + item.name)
    fs.mkdirSync(tmpDir, { recursive: true })
    console.log(`  ${item.text}`)
    await tts.toFile(tmpDir, item.text)
    const target = path.join(DIR, item.name + '.mp3')
    fs.renameSync(path.join(tmpDir, 'audio.mp3'), target)
    fs.rmdirSync(tmpDir)
    console.log(`  ✓ ${target}`)
  }

  console.log('\n=== UI 音效 ===')
  for (const item of uiSounds) {
    const tmpDir = path.join(item.dir, '_tmp_' + item.name)
    fs.mkdirSync(tmpDir, { recursive: true })
    console.log(`  ${item.text}`)
    await tts.toFile(tmpDir, item.text)
    const target = path.join(item.dir, item.name + '.mp3')
    fs.renameSync(path.join(tmpDir, 'audio.mp3'), target)
    fs.rmdirSync(tmpDir)
    console.log(`  ✓ ${target}`)
  }

  console.log('\n✅ 全部完成！')
  tts.close()
}

main().catch(console.error)
