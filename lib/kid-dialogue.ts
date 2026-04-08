type KidifyOptions = {
  concept?: string
  characterName?: string
  keyword?: string
}

const toLower = (v: string) => v.toLowerCase()

function normalizeConcept(concept: string) {
  return concept
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .replace('e=mc²', 'e=mc^2')
}

const conceptToKidLine: Record<string, string> = {
  // Einstein
  relativity: 'Time can move slower if you travel very fast!',
  'speed of light': 'Light is the fastest messenger in the universe!',
  'time dilation': 'Fast travel can make time slow down for you!',
  'e=mc^2': 'Tiny mass can turn into huge energy!',

  // Curie
  radioactivity: 'Some tiny atoms let energy out by themselves!',
  radium: 'Radium can glow in the dark and release energy!',
  polonium: 'Polonium is another element that can release energy from tiny atoms.',
  'scientific persistence': 'Great discoveries take practice, patience, and careful notes!',

  // Franklin / electricity
  'lightning is electricity': 'Lightning is electricity moving through the sky!',
  'electrical conductivity': 'Some things let electricity pass easily!',
  'lightning rod': 'A lightning rod gives electricity a safe path!',
  'static electricity': 'Rub things together and you can build up tiny charges!',

  // Moon landing
  'moon gravity': 'On the Moon, gravity is weaker, so you can hop higher!',
  'lunar surface': 'The Moon is dusty and full of old rocks!',
  'space travel': 'Space travel is a big teamwork adventure!',
  'apollo mission': 'Apollo missions helped humans explore the Moon!',

  // Newton
  gravity: 'Gravity is the pull that keeps things together!',
  'three laws of motion': 'Motion follows simple rules: push, stop, and react!',
  calculus: 'Calculus helps us describe change step by step!',
  'universal gravitation': 'Every object pulls on every other object!',

  // Cleopatra / Egypt
  'ancient egypt': 'Ancient Egypt had powerful cities along the Nile!',
  'library of alexandria': 'Books can hold a whole world of ideas!',
  pyramids: 'Pyramids were giant projects made with teamwork and planning!',
  hieroglyphics: 'Hieroglyphs are picture writing!',

  // Wright brothers
  'first flight': 'The first powered flight proved dreams can fly!',
  'wing warping': 'Wing warping helps a plane turn and stay balanced!',
  'aircraft control': 'Control means you can steer where you want to go!',
  'aviation history': 'Flying changed how people travel forever!',
}

function shorten(text: string, maxChars: number) {
  const cleaned = text
    .replace(/\s+/g, ' ')
    .replace(/—/g, '. ')
    .replace(/[“”]/g, '"')
    .trim()

  // Keep only the first couple of sentences to stay kid-friendly.
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean)
  const first = sentences.slice(0, 2).join(' ')
  if (first.length <= maxChars) return first
  return first.slice(0, Math.max(0, maxChars - 1)).trimEnd() + '…'
}

export function kidDiscoveryLine(concept: string) {
  const norm = normalizeConcept(concept)
  return (
    conceptToKidLine[norm] ??
    conceptToKidLine[norm.replace(/\s+/g, ' ')] ??
    `You just discovered: ${concept}! Great job!`
  )
}

export function kidDiscoveryQuestion(concept: string) {
  const norm = normalizeConcept(concept)

  const conceptToQuestion: Record<string, string> = {
    // Einstein
    relativity: 'why time and space can change when you move fast',
    'speed of light': 'how fast light travels',
    'time dilation': 'why time can slow down for fast travelers',
    'e=mc^2': 'how tiny things can hold huge energy',

    // Curie
    radioactivity: 'what “radioactivity” is and where energy comes from',
    radium: 'why some things can glow in the dark',
    polonium: 'how scientists keep finding new elements',
    'scientific persistence': 'why practice and patience help us discover new things',

    // Franklin / electricity
    'lightning is electricity': 'why lightning is electricity',
    'electrical conductivity': 'how electricity can travel through some materials',
    'lightning rod': 'how a lightning rod keeps people safer',
    'static electricity': 'how rubbing things together can make tiny sparks',

    // Moon
    'moon gravity': 'why jumping feels different on the Moon',
    'lunar surface': 'what the Moon’s ground looks like up close',
    'space travel': 'how space missions help people explore',
    'apollo mission': 'what it was like to visit the Moon',

    // Newton
    gravity: 'why things fall down and how gravity works',
    'three laws of motion': 'the simple rules of motion',
    calculus: 'how we track change step by step',
    'universal gravitation': 'why objects pull on each other',

    // Egypt
    'ancient egypt': 'what made Ancient Egypt special along the Nile',
    'library of alexandria': 'why libraries are power-houses of ideas',
    pyramids: 'how people built the pyramids',
    hieroglyphics: 'how hieroglyphs are picture messages',

    // Wright brothers
    'first flight': 'how humans learned to fly',
    'wing warping': 'how airplanes can turn safely',
    'aircraft control': 'how pilots steer and stay balanced',
    'aviation history': 'how flying changed the world',
  }

  return conceptToQuestion[norm] ?? `more about ${concept}`
}

export function kidifyDialogue(text: string, options?: KidifyOptions) {
  if (!text) return ''

  if (options?.concept) {
    return kidDiscoveryLine(options.concept)
  }

  const lower = toLower(text)

  // Keyword-based one-liners (keeps terminology simple).
  if (lower.includes('relativity') || lower.includes('spacetime') || lower.includes('time dilation')) {
    return 'Time can move slower if you travel very fast!'
  }
  if (lower.includes('speed of light') || lower.includes('light travels') || lower.includes('300,000')) {
    return 'Light is the fastest messenger in the universe!'
  }
  if (lower.includes('e=mc') || lower.includes('mc²')) {
    return 'Tiny mass can turn into huge energy!'
  }
  if (lower.includes('gravity')) {
    return 'Gravity is the pull that keeps things together!'
  }
  if (lower.includes('radioactivity') || lower.includes('radiation')) {
    return 'Some tiny atoms let energy out by themselves!'
  }
  if (lower.includes('lightning') || lower.includes('electricity')) {
    return 'Lightning is electricity moving through the sky!'
  }
  if (lower.includes('moon') && lower.includes('gravity')) {
    return 'On the Moon, gravity is weaker, so you can hop higher!'
  }
  if (lower.includes('library of alexandria') || lower.includes('library')) {
    return 'Books can hold a whole world of ideas!'
  }
  if (lower.includes('pyramids') || lower.includes('pyramid')) {
    return 'Pyramids were giant projects made with teamwork and planning!'
  }
  if (lower.includes('hieroglyph')) {
    return 'Hieroglyphs are picture writing!'
  }
  if (lower.includes('wing warping')) {
    return 'Wing warping helps a plane turn and stay balanced!'
  }
  if (lower.includes('first flight')) {
    return 'The first powered flight proved dreams can fly!'
  }

  // General fallback: shorten into 1-2 kid-friendly sentences.
  return shorten(text, 110)
}

