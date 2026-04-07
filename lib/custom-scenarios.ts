export interface ScenarioFact {
  emoji: string
  text: string
}

export interface ScenarioHotspot {
  id: string
  label: string
  x: number
  y: number
  emoji: string
}

export interface ScenarioSceneObject {
  emoji: string
  label: string
  x: number
  y: number
}

export interface CustomScenario {
  id: string
  title: string
  emoji: string
  aliases: string[]
  promptSuggestions: string[]
  character: {
    name: string
    role: string
    emoji: string
    personality: string
    dialogueStyle: string
    color: string
  }
  environment: {
    setting: string
    atmosphere: string
    sounds: string[]
    objects: string[]
  }
  portalMessages: {
    loading: string[]
    character: string
  }
  dialogue: {
    greeting: string
    responses: Record<string, string[]>
    discoveries: string[]
  }
  facts: ScenarioFact[]
  design: {
    locationLabel: string
    map: {
      x: number
      y: number
      description: string
      adventure: string
    }
    gradient: {
      from: string
      to: string
      glow: string
    }
    sceneObjects: ScenarioSceneObject[]
    interactiveElements: ScenarioHotspot[]
  }
}

const defaultScenarioId = 'einstein'

export const customScenarios: Record<string, CustomScenario> = {
  einstein: {
    id: 'einstein',
    title: "Einstein's Lab",
    emoji: '⚛️',
    aliases: ['einstein', 'relativity', 'light', 'time', 'spacetime', 'physics', 'energy', 'bern', 'switzerland', 'e mc2', 'e mc squared', 'patent office'],
    promptSuggestions: ['What is relativity?', 'How fast is light?', 'Why does time slow down?', 'What is E=mc²?'],
    character: {
      name: 'Albert Einstein',
      role: 'Theoretical Physicist',
      emoji: '👨‍🔬',
      personality: 'Brilliant, curious, playful, imaginative',
      dialogueStyle: 'Warm and mind-bending, explains huge ideas with everyday images',
      color: '#f97066'
    },
    environment: {
      setting: "Einstein's patent office in Bern, Switzerland, 1905. Papers, clocks, and notebooks surround a brilliant young scientist.",
      atmosphere: 'A bright room buzzing with impossible ideas about light, time, and the universe',
      sounds: ['Clock ticking', 'Papers shuffling', 'Pen scratching', 'Streetcars outside'],
      objects: ['Equations board', 'Pocket watch', 'Patent documents', 'Light-beam sketches']
    },
    portalMessages: {
      loading: [
        '⚛️ Aligning with Bern in 1905...',
        '💡 Rebuilding Einstein’s thought experiment room...',
        '⏰ Calibrating the clocks for relativity...',
        '📝 Opening the notebook full of impossible questions...',
        '👨‍🔬 Albert Einstein is ready to bend time with you!'
      ],
      character: '⚛️ Albert Einstein is waiting beside a beam of light!'
    },
    dialogue: {
      greeting: "Ah, welcome young explorer! I'm Albert Einstein. I have been wondering what the universe looks like if you race beside a beam of light. Ask me about relativity, energy, or the strange behavior of time.",
      responses: {
        relativity: [
          'Relativity means motion changes how space and time behave. Two people moving differently can measure time differently and both still be correct.',
          'I realized the laws of nature must work the same way for everyone moving steadily. That idea forced space and time to join together.'
        ],
        light: [
          'Light is astonishing because its speed stays the same for every observer. That simple fact changed physics forever.',
          'Imagine trying to chase a flashlight beam. No matter how fast you run, light still speeds away at the same cosmic limit. Light travels at about 300,000 kilometers every second!'
        ],
        time: [
          'Time is not a single universal clock. Fast motion and gravity can stretch it so one traveler ages differently from another.',
          'That is why I say time is flexible. It can slow down when you move very fast or when gravity becomes extremely strong. We call this time dilation.'
        ],
        energy: [
          'My equation E = mc² says mass and energy are two forms of the same thing. A tiny bit of mass can hold a tremendous amount of energy.',
          'The Sun shines because matter is being transformed into energy deep in its core. It is a perfect example of that famous equation at work.'
        ],
        physics: [
          'Physics is the study of how the universe works at the most fundamental level — from the tiniest atoms to the largest galaxies.',
          'I loved physics because it asks the biggest questions: What is time? What is light? What holds the universe together?'
        ],
        space: [
          'Space is not empty — it bends and curves near heavy objects. This bending is what we feel as gravity!',
          'My theory of General Relativity showed that massive objects like the Sun warp the fabric of space-time around them, like a bowling ball sitting on a stretched blanket.'
        ],
        atom: [
          'Atoms are incredibly tiny building blocks that make up everything around us — you, me, the air, the stars!',
          'In 1905 I helped prove that atoms were real by explaining why tiny particles jiggled in water. That phenomenon is called Brownian motion.'
        ],
        gravity: [
          'Gravity is not just a force pulling you down. It is actually the curving of space-time itself caused by massive objects!',
          'My General Theory of Relativity in 1915 replaced Newton\'s idea of gravity as a force with the idea that mass bends space and time around it.'
        ],
        math: [
          'Mathematics is the language of the universe. Without it, we could never describe how gravity bends space or how light behaves.',
          'I was not always the best student, but I found deep beauty in mathematics once I realized it could unlock the secrets of nature.'
        ],
        school: [
          'I was a curious child but I did not love the strict schools of my time. I preferred to ask my own questions and think freely.',
          'I struggled with some subjects but excelled in mathematics and physics. Remember, every great thinker has areas where they struggle — and that is perfectly okay!'
        ],
        speed: [
          'Nothing can travel faster than the speed of light. It is the ultimate cosmic speed limit at about 300,000 kilometers per second!',
          'As objects approach the speed of light, time slows down for them, they become heavier, and they need infinite energy to go faster. That is why nothing with mass can reach light speed.'
        ],
        Nobel: [
          'I won the Nobel Prize in Physics in 1921, but not for relativity! It was for explaining the photoelectric effect — how light can knock electrons out of metals.',
          'The photoelectric effect proved that light behaves as both a wave and a particle. We call these particles of light photons.'
        ],
        universe: [
          'The universe is expanding! Every galaxy is moving away from every other galaxy, like dots on a balloon being blown up.',
          'I believe the most incomprehensible thing about the universe is that it is comprehensible. We can actually understand it through science and mathematics!'
        ],
        help: [
          'Of course! You can ask me about relativity, light, time, energy, atoms, gravity, space, mathematics, or even my life as a scientist. What interests you most?',
          'Try asking about E = mc², the speed of light, time dilation, or how gravity bends space. I love explaining these ideas!'
        ]
      },
      discoveries: ['Relativity', 'Speed of Light', 'Time Dilation', 'E=mc²']
    },
    facts: [
      { emoji: '⚛️', text: 'Einstein published four groundbreaking papers in 1905, his miracle year.' },
      { emoji: '💡', text: 'The speed of light in vacuum is about 300,000 kilometers per second.' },
      { emoji: '⏰', text: 'GPS satellites need relativity corrections so maps stay accurate on Earth.' }
    ],
    design: {
      locationLabel: 'Bern, Switzerland — 1905',
      map: { x: 55, y: 35, description: 'Switzerland - 1905', adventure: 'Theory of Relativity' },
      gradient: { from: '#fff7ed', to: '#fde68a', glow: '#fbbf24' },
      sceneObjects: [
        { emoji: '🕰️', label: 'Pocket watch', x: 18, y: 28 },
        { emoji: '📝', label: 'Patent papers', x: 74, y: 58 },
        { emoji: '💡', label: 'Light experiment', x: 56, y: 72 }
      ],
      interactiveElements: [
        { id: 'equations', label: "Einstein's equations reshape space and time.", x: 72, y: 26, emoji: '⚛️' },
        { id: 'desk', label: 'This desk is where thought experiments become science.', x: 32, y: 68, emoji: '📝' },
        { id: 'window', label: 'Bern’s city clocks inspire questions about time.', x: 84, y: 42, emoji: '🕰️' }
      ]
    }
  },
  curie: {
    id: 'curie',
    title: "Marie Curie's Lab",
    emoji: '☢️',
    aliases: ['curie', 'marie', 'radioactivity', 'radiation', 'radium', 'polonium', 'chemistry', 'physics lab', 'paris', 'glow'],
    promptSuggestions: ['What is radioactivity?', 'What did radium do?', 'How did you make discoveries?', 'Why do some elements glow?'],
    character: {
      name: 'Marie Curie',
      role: 'Physicist & Chemist',
      emoji: '👩‍🔬',
      personality: 'Focused, fearless, patient, deeply determined',
      dialogueStyle: 'Clear and encouraging, explains science through careful observation',
      color: '#f472b6'
    },
    environment: {
      setting: 'A laboratory in Paris, 1898. Glass tubes, chemical samples, and notebooks glow faintly in the dim room.',
      atmosphere: 'Quiet concentration mixed with the wonder of uncovering invisible forces',
      sounds: ['Glass clinking', 'Notebook pages turning', 'Soft burner hiss', 'Metal tools tapping'],
      objects: ['Pitchblende samples', 'Glass beakers', 'Radium salts', 'Research journals']
    },
    portalMessages: {
      loading: [
        '☢️ Routing to Paris in 1898...',
        '🧪 Preparing Curie’s chemistry benches...',
        '✨ Revealing the strange glow of radium...',
        '📘 Opening Marie Curie’s research notes...',
        '👩‍🔬 Marie Curie is ready to share the science of radioactivity!'
      ],
      character: '☢️ Marie Curie welcomes you into her laboratory of glowing discoveries!'
    },
    dialogue: {
      greeting: "Bonjour! I'm Marie Curie. In this laboratory I am studying invisible rays that come from certain elements. Ask me about radioactivity, radium, or how persistence leads to discovery.",
      responses: {
        radioactivity: [
          'Radioactivity is energy released by unstable atoms. Even though we cannot see the atoms themselves, we can measure their powerful effects.',
          'I named this phenomenon radioactivity because some substances continuously send out rays all on their own, without any outside energy.'
        ],
        radium: [
          'Radium amazed us because it glowed in the dark and released strong energy. Extracting even a tiny amount required enormous patience and careful work.',
          'When we isolated radium from pitchblende ore, it helped prove that atoms were not unchanging little balls. They could transform and release energy.'
        ],
        discovery: [
          'Scientific discovery often looks like repetition, patience, and detailed notes. Great breakthroughs are built from many careful steps.',
          'I processed tons of pitchblende to isolate new elements. Persistence is one of the most important tools in science.'
        ],
        future: [
          'I believe science should serve humanity. Research into radiation helped medicine, especially in treating serious diseases like cancer.',
          'Knowledge belongs to everyone. That is why I did not patent the radium-isolation process — I wanted it to help all people.'
        ],
        radiation: [
          'Radiation is invisible energy that comes from the nuclei of certain atoms. There are different types: alpha rays, beta rays, and gamma rays.',
          'Understanding radiation opened whole new areas in medicine and science. X-rays and radiation therapy are used to this day to help doctors see inside our bodies and treat diseases.'
        ],
        glow: [
          'Some radioactive materials produce a visible glow! Radium salts glow a faint blue-green in the dark because the radiation excites nearby molecules.',
          'The glow of radium fascinated everyone who saw it. But we later learned that this same radiation can be dangerous if not handled carefully.'
        ],
        element: [
          'An element is a pure substance made of only one kind of atom. Pierre and I discovered two new elements: polonium and radium.',
          'Polonium was named after my homeland, Poland. Radium was named from the Latin word "radius" meaning ray, because it gives off such powerful rays.'
        ],
        polonium: [
          'Polonium was the first element Pierre and I discovered in 1898. I named it after Poland, my home country, which was not an independent nation at the time.',
          'Finding polonium proved that pitchblende contained unknown radioactive elements. It encouraged us to keep searching, and that led us to radium.'
        ],
        nobel: [
          'I was the first woman to win a Nobel Prize, and later the first person ever to win two Nobel Prizes in two different sciences — Physics in 1903 and Chemistry in 1911!',
          'The 1903 Nobel Prize in Physics was shared with Pierre and Henri Becquerel for our work on radioactivity. The 1911 Chemistry Nobel was for discovering radium and polonium.'
        ],
        women: [
          'When I began studying science, very few women were allowed in universities. I moved from Poland to Paris to get my education at the Sorbonne.',
          'I want every girl to know: you belong in science. Curiosity and determination matter far more than what others expect of you.'
        ],
        science: [
          'Science is a way of understanding the world through careful observation and experiment. Nothing is ever too small to study carefully.',
          'A scientist must be patient and precise. Every experiment teaches something, even when the result is not what you expected.'
        ],
        chemistry: [
          'Chemistry is the study of substances and how they change. In my laboratory, I used chemistry to separate new elements from tons of mineral ore.',
          'Chemical separation requires patience — heating, dissolving, filtering, and crystallizing again and again until you isolate the pure element.'
        ],
        danger: [
          'We did not know at first how dangerous radiation could be. I often carried radioactive samples in my pocket! Today we know much better how to protect ourselves.',
          'The dangers of radiation taught the world an important lesson: every powerful discovery must be understood fully and used responsibly.'
        ],
        help: [
          'Of course! You can ask me about radioactivity, radium, polonium, chemistry, my Nobel Prizes, or what it was like being a woman in science. What would you like to learn?',
          'Try asking about how radioactivity works, why radium glows, or how I discovered new elements. I love sharing my journey with young explorers!'
        ]
      },
      discoveries: ['Radioactivity', 'Radium', 'Polonium', 'Scientific Persistence']
    },
    facts: [
      { emoji: '🏅', text: 'Marie Curie was the first person to win two Nobel Prizes in two different sciences.' },
      { emoji: '✨', text: 'Some radioactive materials produce a visible glow because of the energy they release.' },
      { emoji: '🧪', text: 'Curie processed huge amounts of ore to isolate tiny traces of radium and polonium.' }
    ],
    design: {
      locationLabel: 'Paris, France — 1898',
      map: { x: 52, y: 38, description: 'France/Poland - 1898', adventure: 'Radioactivity Discovery' },
      gradient: { from: '#fdf2f8', to: '#fbcfe8', glow: '#f472b6' },
      sceneObjects: [
        { emoji: '🧪', label: 'Chemical samples', x: 20, y: 30 },
        { emoji: '✨', label: 'Glowing radium', x: 62, y: 66 },
        { emoji: '📓', label: 'Research notebook', x: 78, y: 34 }
      ],
      interactiveElements: [
        { id: 'beakers', label: 'Careful chemical separation reveals new elements.', x: 28, y: 64, emoji: '🧪' },
        { id: 'glow', label: 'The mysterious glow hints at radioactivity inside the sample.', x: 68, y: 38, emoji: '✨' },
        { id: 'notes', label: 'Curie’s detailed notes turn observations into science.', x: 80, y: 56, emoji: '📘' }
      ]
    }
  },
  electricity: {
    id: 'electricity',
    title: 'When electricity was discovered!',
    emoji: '⚡',
    aliases: ['electricity', 'franklin', 'benjamin', 'lightning', 'kite', 'storm', 'static', 'philadelphia', 'lightning rod', 'spark'],
    promptSuggestions: ['What is electricity?', 'What causes lightning?', 'Tell me about the kite experiment', 'Why invent the lightning rod?'],
    character: {
      name: 'Benjamin Franklin',
      role: 'Inventor & Statesman',
      emoji: '🪁',
      personality: 'Curious, inventive, practical, witty',
      dialogueStyle: 'Friendly and energetic, turns science into hands-on adventure',
      color: '#fbbf24'
    },
    environment: {
      setting: "Franklin's workshop in Philadelphia, 1752. Scientific instruments, storm clouds, and a kite experiment are ready.",
      atmosphere: 'Crackling anticipation just before a thunderstorm changes science forever',
      sounds: ['Thunder rumbling', 'Glass clinking', 'Pages turning', 'Wind gusting'],
      objects: ['Kite with key', 'Leyden jar', 'Lightning rod', 'Workbench tools']
    },
    portalMessages: {
      loading: [
        '⚡ Finding Benjamin Franklin in stormy Philadelphia...',
        '🪁 Stringing up the famous kite experiment...',
        '🌩️ Charging the sky with thunderclouds...',
        '🔑 Connecting the key and Leyden jar...',
        '⚡ Benjamin Franklin is ready to reveal the secret of lightning!'
      ],
      character: '⚡ Benjamin Franklin is ready to show you the spark of discovery!'
    },
    dialogue: {
      greeting: "Good day, young scientist! Benjamin Franklin here. I am exploring whether lightning and electricity are truly the same thing. Ask me about storms, sparks, or my famous kite experiment.",
      responses: {
        electricity: [
          'Electricity behaves like a flow of tiny invisible charges. It can move through some materials easily and refuse to move through others.',
          'The wonderful thing is that electricity is not just for storms. Once we understand it, we can use it for lighting, machines, and inventions that change daily life!'
        ],
        lightning: [
          'Lightning is a giant natural electrical spark in the sky! My work helped show that it follows the same rules as smaller sparks in the laboratory.',
          'A single bolt of lightning contains about one billion volts of electricity and can heat the air to 30,000 degrees — five times hotter than the surface of the Sun!'
        ],
        experiment: [
          'My kite experiment helped prove the connection between lightning and electricity. The key collected charge from the wet string during the storm.',
          'It was a daring experiment, but it helped people understand that the sky and the laboratory were part of the same electrical story. Science requires courage!'
        ],
        invention: [
          'I loved inventions because they solve practical problems. The lightning rod saved homes, churches, and public buildings from fires caused by lightning strikes.',
          'A useful discovery changes daily life. Besides the lightning rod, I also invented bifocal glasses, the Franklin stove, and even swim fins!'
        ],
        kite: [
          'The kite in my experiment was not struck by lightning — that would have been deadly! Instead, the wet string conducted a small amount of electrical charge from the storm clouds.',
          'I attached a metal key to the string of my kite. When I brought my knuckle close to the key, I felt a spark — proof that storm clouds carry electricity!'
        ],
        storm: [
          'Thunderstorms are nature\'s electrical engines. The friction of water droplets and ice crystals inside clouds builds up enormous amounts of electrical charge.',
          'When the charge becomes too great, it leaps between clouds or between a cloud and the ground as a lightning bolt. Nature truly is powerful!'
        ],
        static: [
          'Static electricity happens when objects build up electric charge on their surface. Rubbing a balloon on your hair creates static — and makes your hair stand up!',
          'I studied static electricity using a Leyden jar, which is like a very early battery. It could store electrical charge and release it as a spark.'
        ],
        conductor: [
          'A conductor is a material that lets electricity flow through it easily. Metals like copper, iron, and the key on my kite string are excellent conductors.',
          'An insulator is the opposite — materials like glass, rubber, and dry wood block electricity. Understanding this difference is key to using electricity safely.'
        ],
        battery: [
          'I was actually the first person to use the word "battery" for a set of electrical devices connected together! I borrowed it from the military term for a row of cannons.',
          'The Leyden jar was an early device for storing electrical charge. It helped me and other scientists study electricity before modern batteries were invented.'
        ],
        founding: [
          'Besides being a scientist, I was one of the Founding Fathers of the United States of America. I helped draft the Declaration of Independence and the U.S. Constitution.',
          'I believed that education, science, and civic duty were the foundations of a great society. That is why I founded libraries, universities, and fire departments.'
        ],
        printing: [
          'I started my career as a printer and publisher. I published "Poor Richard\'s Almanack," which was full of clever sayings and practical advice.',
          'One of my most famous sayings is "An investment in knowledge pays the best interest." I truly believed that learning was the greatest treasure.'
        ],
        science: [
          'Science is about asking questions and testing ideas. Every good experiment, whether it succeeds or fails, teaches us something valuable.',
          'I was never formally trained as a scientist. My curiosity drove me to experiment, observe, and never stop asking "why" and "how."'
        ],
        bifocal: [
          'I invented bifocal glasses because I was tired of switching between two pairs — one for reading and one for seeing far away. So I combined both lenses into one frame!',
          'The Franklin stove was another practical invention. It heated rooms more efficiently than a fireplace while using less wood and producing less smoke.'
        ],
        help: [
          'Ask me about electricity, lightning, my kite experiment, the lightning rod, static electricity, conductors, or my inventions. I love sharing discoveries!',
          'You can also ask about my role in founding America, my printing career, or my other inventions like bifocals and the Franklin stove!'
        ]
      },
      discoveries: ['Lightning is Electricity', 'Electrical Conductivity', 'Lightning Rod', 'Static Electricity']
    },
    facts: [
      { emoji: '⚡', text: 'Franklin helped prove that lightning is a form of electricity.' },
      { emoji: '🔑', text: 'Conductors such as metal help electric charge travel more easily.' },
      { emoji: '🏠', text: 'Lightning rods protect buildings by safely guiding electricity into the ground.' }
    ],
    design: {
      locationLabel: 'Philadelphia, USA — 1752',
      map: { x: 25, y: 40, description: 'USA - 1752', adventure: 'Electricity Discovery' },
      gradient: { from: '#fff7ed', to: '#fcd34d', glow: '#f59e0b' },
      sceneObjects: [
        { emoji: '🪁', label: 'Kite and string', x: 18, y: 34 },
        { emoji: '🔑', label: 'Charged key', x: 68, y: 60 },
        { emoji: '🌩️', label: 'Thundercloud', x: 78, y: 24 }
      ],
      interactiveElements: [
        { id: 'kite', label: 'The kite helps collect charge from the storm.', x: 28, y: 48, emoji: '🪁' },
        { id: 'jar', label: 'The Leyden jar stores electricity like an early battery.', x: 62, y: 68, emoji: '⚗️' },
        { id: 'rod', label: 'The lightning rod keeps buildings safe during storms.', x: 82, y: 38, emoji: '⚡' }
      ]
    }
  },
  moonlanding: {
    id: 'moonlanding',
    title: 'Moon Landing 1969!',
    emoji: '🚀',
    aliases: ['moon', 'moon landing', 'apollo', 'armstrong', 'astronaut', 'space', 'nasa', 'eagle', 'lunar', 'houston'],
    promptSuggestions: ['What is the Moon like?', 'How did Apollo 11 land?', 'What do astronauts do?', 'What came after the Moon landing?'],
    character: {
      name: 'Neil Armstrong',
      role: 'Astronaut',
      emoji: '👨‍🚀',
      personality: 'Brave, calm, precise, humble',
      dialogueStyle: 'Measured and inspiring, mixes technical detail with wonder',
      color: '#fb923c'
    },
    environment: {
      setting: 'Apollo 11 Lunar Module at the Sea of Tranquility, Moon, 1969. Controls glow while the gray lunar surface stretches outside.',
      atmosphere: 'Silent, vast, and unforgettable, with Earth hanging like a blue marble in the darkness',
      sounds: ['Radio static', 'Control beeps', 'Suit breathing', 'Mission control chatter'],
      objects: ['Lunar module controls', 'Moon rocks', 'Helmet visor', 'Mission checklist']
    },
    portalMessages: {
      loading: [
        '🚀 Calculating a path to the Moon...',
        '🌕 Preparing the Eagle for landing...',
        '📡 Linking with Houston mission control...',
        '👨‍🚀 Sealing the lunar suit and checklist...',
        '🚀 Neil Armstrong is ready for one giant leap!'
      ],
      character: '🚀 Neil Armstrong is waiting on the lunar surface!'
    },
    dialogue: {
      greeting: "Houston, we have a visitor! I'm Neil Armstrong, and you've arrived during the Apollo 11 mission. Ask me about the Moon, our landing, or why this journey changed human history.",
      responses: {
        moon: [
          'The Moon feels quiet beyond imagination. Its dusty surface and lower gravity make every movement feel unfamiliar and unforgettable.',
          'When you stand on the Moon, Earth looks small, bright, and fragile. It changes how you think about our home planet forever.'
        ],
        landing: [
          'The landing demanded calm decisions. We were low on fuel and the computer was overloaded, so I guided the module manually to a safer spot.',
          'Apollo 11 proved that training, teamwork, and engineering could carry humans to another world and bring them back safely.'
        ],
        astronaut: [
          'Astronauts train for years in engineering, navigation, survival, and teamwork. Space rewards preparation above all else.',
          'We rely on every checklist and every teammate. Spaceflight is never a solo achievement — thousands of people on the ground made this possible.'
        ],
        future: [
          'The Moon landing was a beginning, not an ending. Every mission after Apollo builds on the courage and knowledge gathered here.',
          'One day your generation may build homes on the Moon or walk on Mars. Exploration always opens the next door for humanity.'
        ],
        apollo: [
          'Apollo 11 launched on July 16, 1969 with three astronauts: myself, Buzz Aldrin, and Michael Collins. Collins orbited the Moon while Buzz and I walked on it.',
          'The entire Apollo program flew 11 crewed missions. Six of them successfully landed astronauts on the Moon between 1969 and 1972.'
        ],
        earth: [
          'Seeing Earth from the Moon was life-changing. Our whole planet — every person, every ocean, every mountain — fit behind my thumb held at arm\'s length.',
          'The famous "Earthrise" photo from Apollo 8 showed humanity for the first time how beautiful and small our world looks from space. It inspired the environmental movement.'
        ],
        gravity: [
          'The Moon\'s gravity is only about one-sixth of Earth\'s. That means I weighed only about 30 pounds on the Moon instead of 180! Walking felt like bouncing in slow motion.',
          'Low gravity made it hard to balance at first. We had to learn a completely new way to walk — more like hopping and bouncing than normal steps.'
        ],
        rocket: [
          'The Saturn V rocket that carried us to the Moon was 363 feet tall — taller than the Statue of Liberty! It remains the most powerful rocket ever successfully flown.',
          'The Saturn V had three stages. Each one fired and then separated when its fuel ran out, making the spacecraft lighter as it flew higher and faster.'
        ],
        nasa: [
          'NASA, the National Aeronautics and Space Administration, was founded in 1958. The Apollo program was NASA\'s greatest achievement during the Space Race.',
          'About 400,000 people worked on the Apollo program across America. Engineers, scientists, mathematicians, seamstresses who sewed spacesuits — every person was essential.'
        ],
        flag: [
          'Yes, we planted an American flag on the Moon! It had a special horizontal rod to keep it extended since there is no wind on the Moon to make it wave.',
          'We also left a plaque that reads: "We came in peace for all mankind." The Moon landing was meant to represent all of humanity, not just one nation.'
        ],
        walk: [
          '"That\'s one small step for man, one giant leap for mankind." Those were my words as I became the first human to set foot on the Moon on July 20, 1969.',
          'Buzz and I spent about 2.5 hours walking on the lunar surface. We collected rock samples, took photos, and set up scientific instruments.'
        ],
        suit: [
          'Our spacesuits weighed about 180 pounds on Earth but only 30 pounds on the Moon. They had to protect us from extreme temperatures, radiation, and the vacuum of space.',
          'The suit had 21 layers of material! It was like wearing a miniature spacecraft. Inside, it provided oxygen, temperature control, and communication with Houston.'
        ],
        star: [
          'From the Moon, the stars are incredibly bright and clear because there is no atmosphere to blur the light. The sky is perfectly black even during lunar daytime.',
          'Space is filled with wonder. Every star you see is a sun, possibly with its own planets. The universe is far larger than we can imagine.'
        ],
        help: [
          'You can ask me about the Moon, the Apollo 11 mission, rockets, NASA, gravity, spacesuits, the flag we planted, or what Earth looks like from space!',
          'Try asking about the Moon landing, Moon gravity, the Saturn V rocket, or my famous first words on the lunar surface. I love sharing this adventure!'
        ]
      },
      discoveries: ['Moon Gravity', 'Lunar Surface', 'Space Travel', 'Apollo Mission']
    },
    facts: [
      { emoji: '🌕', text: 'The Moon’s gravity is about one-sixth of Earth’s gravity.' },
      { emoji: '📡', text: 'Apollo 11 landed on July 20, 1969, in the Sea of Tranquility.' },
      { emoji: '🚀', text: 'The mission showed how computing, engineering, and teamwork could achieve the impossible.' }
    ],
    design: {
      locationLabel: 'Sea of Tranquility, Moon — 1969',
      map: { x: 75, y: 20, description: 'Moon - 1969', adventure: 'First Moon Walk' },
      gradient: { from: '#0f172a', to: '#334155', glow: '#93c5fd' },
      sceneObjects: [
        { emoji: '🌍', label: 'Distant Earth', x: 18, y: 24 },
        { emoji: '🚀', label: 'Lunar module', x: 62, y: 66 },
        { emoji: '🪨', label: 'Moon rocks', x: 82, y: 44 }
      ],
      interactiveElements: [
        { id: 'earth', label: 'Earth appears as a small bright world from the Moon.', x: 24, y: 30, emoji: '🌍' },
        { id: 'module', label: 'The Eagle is the spacecraft that carried us down safely.', x: 62, y: 58, emoji: '🚀' },
        { id: 'surface', label: 'The dusty regolith tells the Moon’s ancient story.', x: 80, y: 68, emoji: '🌕' }
      ]
    }
  },
  newton: {
    id: 'newton',
    title: 'Newton and the apple!',
    emoji: '🍎',
    aliases: ['newton', 'apple', 'gravity', 'motion', 'calculus', 'laws of motion', 'force', 'orbit', 'woolsthorpe'],
    promptSuggestions: ['Why did the apple fall?', 'What is gravity?', 'What are the laws of motion?', 'Why did you invent calculus?'],
    character: {
      name: 'Isaac Newton',
      role: 'Mathematician & Physicist',
      emoji: '🍎',
      personality: 'Thoughtful, brilliant, methodical, quietly intense',
      dialogueStyle: 'Calm and logical, builds ideas step by step',
      color: '#10b981'
    },
    environment: {
      setting: "Newton's garden in Woolsthorpe, England, 1666. An apple tree shades notebooks full of mathematics and physics.",
      atmosphere: 'Peaceful and reflective, where ordinary moments spark universal laws',
      sounds: ['Birdsong', 'Leaves rustling', 'Apple thumps', 'Distant breeze'],
      objects: ['Apple tree', 'Notebook', 'Telescope', 'Mathematical tools']
    },
    portalMessages: {
      loading: [
        '🍎 Traveling to Woolsthorpe in 1666...',
        '🌳 Growing the famous apple tree...',
        '📐 Opening Newton’s mathematical notes...',
        '🌍 Tracing the pull between Earth and Moon...',
        '🍎 Isaac Newton is ready to explain gravity!'
      ],
      character: '🍎 Isaac Newton is waiting beneath the apple tree.'
    },
    dialogue: {
      greeting: "Welcome, young thinker. I'm Isaac Newton. A falling apple led me to ask a much larger question about the force that shapes motion in the heavens and on Earth. Ask me about gravity, motion, or mathematics.",
      responses: {
        gravity: [
          'Gravity pulls objects toward one another. It makes apples fall and also keeps the Moon circling Earth.',
          'The power of gravity depends on mass and distance. Large objects pull harder, while greater distance weakens the effect. This is my Law of Universal Gravitation.'
        ],
        apple: [
          'The apple mattered because it inspired the right question. Why does it fall down, and why always toward the center of Earth?',
          'Great discoveries often begin with ordinary events observed very carefully. I realized the same force pulling the apple might also pull the Moon!'
        ],
        motion: [
          'My laws of motion explain how objects start moving, stop moving, and change direction when forces act on them.',
          'An object keeps doing what it is already doing unless a force changes that state. That simple idea — inertia — explains an enormous amount about the world.'
        ],
        calculus: [
          'Calculus helps us understand constant change. Without it, describing motion and gravity would be far more difficult.',
          'I invented calculus because I needed new mathematics to describe how things change moment by moment. Gottfried Leibniz developed similar ideas independently.'
        ],
        force: [
          'A force is a push or pull that changes how an object moves. My second law says force equals mass times acceleration: F = ma.',
          'For every action there is an equal and opposite reaction — that is my Third Law of Motion. When you jump, you push the Earth and the Earth pushes you back!'
        ],
        orbit: [
          'Planets orbit the Sun because gravity provides the inward pull while their forward speed keeps them from falling straight in. The balance creates a curve.',
          'The Moon orbits Earth for the same reason. Gravity is the invisible string that keeps it swinging around us endlessly.'
        ],
        planet: [
          'The planets follow elliptical orbits around the Sun, as Johannes Kepler discovered. My law of gravity explained WHY they follow those paths.',
          'Every planet, every moon, and every star obeys the same law of gravity. What governs an apple on Earth also governs Jupiter in the sky.'
        ],
        telescope: [
          'I built the first practical reflecting telescope using a curved mirror instead of lenses. This design avoided the color distortions that plagued earlier telescopes.',
          'My reflecting telescope was much shorter and produced clearer images. Versions of my design are still used by astronomers today!'
        ],
        light: [
          'I discovered that white light is actually a mixture of all the colors of the rainbow! When sunlight passes through a prism, it splits into a beautiful spectrum.',
          'Before my experiments, people thought prisms added color to light. I proved the opposite — the colors were already inside the white light all along.'
        ],
        prism: [
          'By passing sunlight through a glass prism, I showed that light separates into red, orange, yellow, green, blue, indigo, and violet — the complete rainbow!',
          'I then used a second prism to recombine the colored rays back into white light, proving that white light is truly a mixture of all colors.'
        ],
        color: [
          'Every color you see is a different wavelength of light. Red has the longest wavelength and violet has the shortest.',
          'Rainbows appear when raindrops act like tiny prisms, splitting sunlight into its component colors across the sky.'
        ],
        law: [
          'My Three Laws of Motion are: 1) Objects stay still or keep moving unless a force acts on them. 2) Force equals mass times acceleration. 3) Every action has an equal and opposite reaction.',
          'These three simple laws explain nearly all everyday motion — from throwing a ball to launching a rocket into space!'
        ],
        science: [
          'If I have seen further than others, it is by standing upon the shoulders of giants. Science is built on the work of those who came before us.',
          'Nature follows mathematical laws. The universe is orderly and predictable, and science is how we discover that beautiful order.'
        ],
        help: [
          'You can ask me about gravity, the apple story, my three laws of motion, calculus, light and prisms, telescopes, orbits, or planets. What sparks your curiosity?',
          'Try asking about forces, how orbits work, why rainbows have colors, or how I invented calculus. I enjoy guiding young thinkers!'
        ]
      },
      discoveries: ['Gravity', 'Three Laws of Motion', 'Calculus', 'Universal Gravitation']
    },
    facts: [
      { emoji: '🍎', text: 'Newton’s apple story became a symbol for asking deep questions about everyday events.' },
      { emoji: '📐', text: 'Newton developed calculus to help describe motion and changing quantities.' },
      { emoji: '🌍', text: 'The same gravity that drops an apple also keeps planets and moons in orbit.' }
    ],
    design: {
      locationLabel: 'Woolsthorpe, England — 1666',
      map: { x: 50, y: 31, description: 'England - 1666', adventure: 'The Gravity Question' },
      gradient: { from: '#ecfdf5', to: '#bbf7d0', glow: '#34d399' },
      sceneObjects: [
        { emoji: '🌳', label: 'Apple tree', x: 22, y: 34 },
        { emoji: '🍎', label: 'Falling apple', x: 52, y: 58 },
        { emoji: '📐', label: 'Math instruments', x: 78, y: 30 }
      ],
      interactiveElements: [
        { id: 'tree', label: 'The apple tree inspires questions about gravity.', x: 26, y: 56, emoji: '🌳' },
        { id: 'notebook', label: 'Newton uses mathematics to turn observations into laws.', x: 66, y: 70, emoji: '📓' },
        { id: 'sky', label: 'The Moon overhead follows the same force as the falling apple.', x: 82, y: 28, emoji: '🌙' }
      ]
    }
  },
  egypt: {
    id: 'egypt',
    title: 'Ancient Egypt with Cleopatra!',
    emoji: '🏛️',
    aliases: ['cleopatra', 'egypt', 'ancient egypt', 'alexandria', 'pyramids', 'nile', 'pharaoh', 'hieroglyphics', 'queen', 'library'],
    promptSuggestions: ['Tell me about ancient Egypt', 'What was the Library of Alexandria?', 'How were pyramids built?', 'Why was the Nile important?'],
    character: {
      name: 'Cleopatra',
      role: 'Queen of Egypt',
      emoji: '👑',
      personality: 'Charismatic, intelligent, strategic, culturally brilliant',
      dialogueStyle: 'Regal and vivid, mixes history with leadership and learning',
      color: '#8b5cf6'
    },
    environment: {
      setting: "Cleopatra's palace in Alexandria, Egypt, 30 BCE. Marble halls, papyrus scrolls, and views toward the Nile and the Mediterranean.",
      atmosphere: 'Majestic, scholarly, and full of the weight of ancient civilization',
      sounds: ['Nile waters', 'Soft lyre music', 'Papyrus rustling', 'Marketplace voices'],
      objects: ['Golden throne', 'Papyrus scrolls', 'Egyptian artifacts', 'Jewels and maps']
    },
    portalMessages: {
      loading: [
        '🏛️ Sailing toward Alexandria...',
        '📜 Unrolling papyrus and royal maps...',
        '🌊 Bringing the Nile breeze into the palace...',
        '👑 Preparing the queen’s audience chamber...',
        '🏛️ Cleopatra is ready to welcome you to ancient Egypt!'
      ],
      character: '👑 Queen Cleopatra awaits you in Alexandria.'
    },
    dialogue: {
      greeting: "Welcome to Alexandria, young scholar. I am Cleopatra, Queen of Egypt. Here power, knowledge, and history meet. Ask me about the Nile, the pyramids, or the great Library of Alexandria.",
      responses: {
        egypt: [
          'Egypt grew strong because the Nile gave us fertile land, transport, and a dependable rhythm for life. We called our land "Kemet" — the Black Land — for its rich dark soil.',
          'Our civilization lasted over 3,000 years! We became famous for architecture, writing, astronomy, medicine, and governance long before many other great civilizations rose.'
        ],
        library: [
          'The Library of Alexandria sought to gather every scroll of knowledge from across the known world. It was a monument to learning itself, housing hundreds of thousands of scrolls.',
          'Scholars from Greece, Persia, India, and beyond came to study here. A ruler must value knowledge — books, languages, and ideas are as powerful as armies.'
        ],
        pyramids: [
          'The Great Pyramid of Giza was built around 2560 BCE as a tomb for Pharaoh Khufu. It was the tallest building in the world for nearly 4,000 years!',
          'The pyramids required extraordinary engineering — precise mathematics, skilled laborers, and incredible organization. Their alignment with the stars shows deep astronomical knowledge.'
        ],
        future: [
          'Civilizations endure when they respect learning and adapt wisely. That is as true for your era as it was for mine.',
          'Power fades, but culture and knowledge can outlast empires. That is why I invested so heavily in the Library and in education.'
        ],
        nile: [
          'The Nile is the lifeblood of Egypt. Every year it flooded and left behind rich fertile soil, allowing us to grow crops and feed millions of people.',
          'The Nile stretches over 4,000 miles, making it one of the longest rivers in the world. Without it, Egypt would be nothing but desert.'
        ],
        pharaoh: [
          'Pharaohs were the rulers of ancient Egypt, considered both kings and living gods. They controlled the army, the treasury, and the temples.',
          'I was the last pharaoh of Egypt. Our dynasty, the Ptolemies, ruled for nearly 300 years after Alexander the Great conquered Egypt.'
        ],
        hieroglyphics: [
          'Hieroglyphics are our sacred writing system using picture symbols. Each symbol can represent a sound, a word, or an idea. There are over 700 different hieroglyphs!',
          'Only specially trained scribes could read and write hieroglyphics. The Rosetta Stone, discovered centuries after my time, finally helped modern people decode our ancient writing.'
        ],
        mummy: [
          'Mummification preserved the body for the afterlife. The process took about 70 days and involved removing organs, drying the body with salt, and wrapping it in linen.',
          'Egyptians believed that the soul needed the body in the afterlife. The most important organs were stored in special jars called canopic jars.'
        ],
        language: [
          'I speak nine languages! Including Egyptian, Greek, Ethiopian, Hebrew, Arabic, and several others. A wise ruler must communicate with all her people and allies.',
          'I was actually the first Ptolemaic ruler to learn the Egyptian language. My Greek ancestors never bothered to learn it, but I believed it was essential.'
        ],
        queen: [
          'I became queen at 18 years old and ruled Egypt for almost 21 years. I was known for my intelligence, political skill, and determination to keep Egypt independent.',
          'Many think of me only for beauty, but I was educated in mathematics, philosophy, and astronomy. A queen rules with her mind, not just her crown.'
        ],
        rome: [
          'Rome was the greatest power of my time. I allied with Julius Caesar and later Mark Antony to protect Egypt from being swallowed by the Roman Empire.',
          'Despite my efforts, Egypt eventually became a Roman province after my death. But Egyptian culture continued to influence Rome and the entire Mediterranean world.'
        ],
        trade: [
          'Alexandria was one of the greatest trading cities in the ancient world. Goods flowed through our ports from Africa, India, Arabia, and all across the Mediterranean.',
          'We traded papyrus, grain, gold, linen, and perfumes. Egypt\'s strategic position between Africa and Asia made us incredibly wealthy and powerful.'
        ],
        alexander: [
          'Alexander the Great founded the city of Alexandria in 331 BCE. He chose this location because of its natural harbor and strategic position on the Mediterranean coast.',
          'After Alexander died, his general Ptolemy took control of Egypt and started my dynasty. The city became the cultural and intellectual capital of the ancient world.'
        ],
        help: [
          'You can ask me about ancient Egypt, the Nile River, pyramids, hieroglyphics, mummies, the Library of Alexandria, or my role as queen. What interests you?',
          'Try asking about pharaohs, the languages I speak, Rome, trade, Alexander the Great, or how Egyptian civilization lasted for thousands of years!'
        ]
      },
      discoveries: ['Ancient Egypt', 'Library of Alexandria', 'Pyramids', 'Hieroglyphics']
    },
    facts: [
      { emoji: '🏛️', text: 'The Nile River made large-scale agriculture and city life possible in ancient Egypt.' },
      { emoji: '📜', text: 'Hieroglyphics combine picture symbols and sounds to record language.' },
      { emoji: '👑', text: 'Cleopatra was known for political skill, education, and speaking multiple languages.' }
    ],
    design: {
      locationLabel: 'Alexandria, Egypt — 30 BCE',
      map: { x: 55, y: 48, description: 'Egypt - 30 BCE', adventure: 'Royal Alexandria' },
      gradient: { from: '#faf5ff', to: '#ddd6fe', glow: '#a78bfa' },
      sceneObjects: [
        { emoji: '👑', label: 'Royal crown', x: 18, y: 28 },
        { emoji: '📜', label: 'Papyrus scroll', x: 70, y: 60 },
        { emoji: '🐫', label: 'Desert caravan', x: 82, y: 34 }
      ],
      interactiveElements: [
        { id: 'library', label: 'Alexandria’s library symbolizes the power of knowledge.', x: 28, y: 64, emoji: '📚' },
        { id: 'throne', label: 'Cleopatra rules with strategy, language, and diplomacy.', x: 60, y: 52, emoji: '👑' },
        { id: 'nile', label: 'The Nile keeps Egypt alive and prosperous.', x: 84, y: 70, emoji: '🌊' }
      ]
    }
  },
  wright: {
    id: 'wright',
    title: 'Wright Brothers first flight!',
    emoji: '✈️',
    aliases: ['wright', 'orville', 'wilbur', 'flight', 'airplane', 'plane', 'aviation', 'flyer', 'engine', 'bicycle'],
    promptSuggestions: ['How did the first airplane fly?', 'What is wing warping?', 'Why did bicycles help?', 'What changed after the first flight?'],
    character: {
      name: 'Orville Wright',
      role: 'Aviation Pioneer',
      emoji: '🛩️',
      personality: 'Practical, inventive, determined, adventurous',
      dialogueStyle: 'Hands-on and optimistic, explains invention through trial and testing',
      color: '#3b82f6'
    },
    environment: {
      setting: 'The Wright brothers workshop in Dayton, Ohio, 1903. Wood frames, bicycle parts, and engine pieces fill the room.',
      atmosphere: 'Mechanical creativity and bold experimentation before the age of flight begins',
      sounds: ['Tools clanking', 'Engine sputtering', 'Wind through windows', 'Blueprint paper rustling'],
      objects: ['The Flyer', 'Workshop tools', 'Bicycle parts', 'Blueprints']
    },
    portalMessages: {
      loading: [
        '✈️ Heading to Dayton in 1903...',
        '🛩️ Assembling the Flyer in the workshop...',
        '🔧 Tuning the lightweight engine...',
        '📐 Unrolling the wing designs and blueprints...',
        '🛩️ Orville Wright is ready to share the story of the first flight!'
      ],
      character: '✈️ Orville Wright is ready to show you how humans learned to fly!'
    },
    dialogue: {
      greeting: "Welcome to our workshop! I'm Orville Wright. My brother Wilbur and I are trying to build a machine that can truly fly under control. Ask me about wings, engines, or how bicycles taught us balance.",
      responses: {
        flight: [
          'Flight is not just about lifting off the ground. Control is the real secret, and that is what we worked so hard to solve.',
          'Our first powered flight on December 17, 1903 lasted just 12 seconds and covered 120 feet — shorter than a modern airplane\'s wingspan! But it proved flight was possible.'
        ],
        airplane: [
          'The Flyer used a lightweight engine, wooden structure, and cloth-covered wings. Every part had to be balanced carefully — it weighed only 605 pounds.',
          'We designed propellers as rotating wings. That idea helped turn engine power into forward thrust. Most people hadn\'t thought of propellers that way before.'
        ],
        control: [
          'Wing warping let us tilt the aircraft and stay balanced. Without control, flight is only a leap, not a journey.',
          'Bicycles taught us that balance matters. Flying and cycling both require constant small adjustments to stay upright and on course.'
        ],
        future: [
          'Once humans learned controlled flight, the world shrank. Travel, trade, rescue, and exploration all changed forever.',
          'Today\'s aircraft began with many experiments, many failures, and one successful moment at Kitty Hawk. Never be afraid to fail — each failure teaches you something!'
        ],
        wing: [
          'Wings create lift because of their special curved shape called an airfoil. Air moves faster over the top than the bottom, creating an upward push.',
          'We tested over 200 different wing shapes in our homemade wind tunnel before finding the design that worked best. Science requires patience and testing!'
        ],
        engine: [
          'No engine available in 1903 was light enough for our airplane, so we built our own! It produced just 12 horsepower but weighed only 180 pounds.',
          'Our mechanic Charlie Taylor helped us build the engine in just six weeks. It was a four-cylinder, water-cooled gasoline engine — remarkably advanced for its time.'
        ],
        bicycle: [
          'Our bicycle repair shop in Dayton, Ohio taught us invaluable lessons. Bikes showed us that a machine can be unstable yet still controllable by the rider.',
          'The bicycle business also funded our flying experiments. Every penny we earned repairing and selling bicycles went into building our aircraft.'
        ],
        'kitty hawk': [
          'We chose Kitty Hawk, North Carolina for our flight tests because it had strong steady winds, soft sandy ground for landing, and privacy from curious crowds.',
          'On that historic day, December 17, 1903, we made four flights. The longest one lasted 59 seconds and covered 852 feet. That was with Wilbur piloting!'
        ],
        propeller: [
          'Most people thought of propellers as spinning fans that push air backward. We realized they work more like spinning wings that create forward thrust.',
          'We designed our own propellers using the same aerodynamic math we used for the wings. They were about 80% efficient — remarkably good even by modern standards!'
        ],
        lift: [
          'Lift is the upward force that keeps an airplane in the air. It is created by the shape of the wing moving through the air at speed.',
          'Lift must be greater than the airplane\'s weight for it to fly. We needed to find the right combination of wing shape, wing area, and speed.'
        ],
        wind: [
          'We built our own wind tunnel to test wing shapes! It was just a wooden box with a fan, but it gave us data that was far more accurate than existing published tables.',
          'We discovered that much of the published data about lift and air pressure was wrong. Our own wind tunnel tests gave us the correct numbers we needed.'
        ],
        wilbur: [
          'My brother Wilbur was my partner in everything. He first became fascinated with flight after reading about Otto Lilienthal\'s gliding experiments in Germany.',
          'Wilbur and I worked as a perfect team — he was more of the visionary thinker, while I was more hands-on with building and testing. Together we were unstoppable!'
        ],
        glider: [
          'Before building our powered Flyer, we built and tested three different gliders between 1900 and 1902. Each one taught us important lessons about control.',
          'Our 1902 glider was the first aircraft with three-axis control — pitch, roll, and yaw. That breakthrough made controlled powered flight possible.'
        ],
        help: [
          'Ask me about flight, our airplane, wing design, our engine, propellers, Kitty Hawk, bicycles, gliders, or my brother Wilbur. What are you curious about?',
          'Try asking about lift, wind tunnels, wing warping, how we built our engine, or what happened at Kitty Hawk. I love sharing our flying adventure!'
        ]
      },
      discoveries: ['First Flight', 'Wing Warping', 'Aircraft Control', 'Aviation History']
    },
    facts: [
      { emoji: '✈️', text: 'The Wright brothers made the first controlled powered flight in 1903.' },
      { emoji: '🛠️', text: 'They built their own engine because available engines were too heavy.' },
      { emoji: '🚲', text: 'Their bicycle business helped fund the research and shaped their ideas about balance.' }
    ],
    design: {
      locationLabel: 'Dayton, Ohio — 1903',
      map: { x: 30, y: 48, description: 'USA - 1903', adventure: 'Birth of Aviation' },
      gradient: { from: '#eff6ff', to: '#bfdbfe', glow: '#60a5fa' },
      sceneObjects: [
        { emoji: '🛩️', label: 'The Flyer', x: 20, y: 34 },
        { emoji: '🔩', label: 'Workshop tools', x: 72, y: 64 },
        { emoji: '🚲', label: 'Bicycle roots', x: 82, y: 30 }
      ],
      interactiveElements: [
        { id: 'flyer', label: 'The Flyer combines lift, thrust, and control.', x: 28, y: 58, emoji: '✈️' },
        { id: 'engine', label: 'A lightweight engine gives the machine the push it needs.', x: 66, y: 68, emoji: '🔧' },
        { id: 'wings', label: 'Wing warping helps the plane bank and stay balanced.', x: 82, y: 42, emoji: '🪶' }
      ]
    }
  }
}

export const scenarioList = Object.values(customScenarios)

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export function getScenarioById(id?: string | null): CustomScenario {
  if (id && customScenarios[id]) {
    return customScenarios[id]
  }

  return customScenarios[defaultScenarioId]
}

export function resolveScenarioFromText(text?: string | null): CustomScenario {
  const normalizedInput = normalizeText(text ?? '')

  if (!normalizedInput) {
    return getScenarioById()
  }

  let bestScenario = getScenarioById()
  let bestScore = 0

  for (const scenario of scenarioList) {
    const searchTerms = [
      scenario.id,
      scenario.title,
      scenario.character.name,
      scenario.character.role,
      scenario.environment.setting,
      ...scenario.aliases,
      ...scenario.promptSuggestions,
      ...scenario.dialogue.discoveries,
      ...scenario.facts.map((fact) => fact.text)
    ]

    let score = 0

    for (const term of searchTerms) {
      const normalizedTerm = normalizeText(term)

      if (!normalizedTerm) {
        continue
      }

      if (normalizedInput === normalizedTerm) {
        score += 12
        continue
      }

      if (normalizedInput.includes(normalizedTerm)) {
        score += Math.min(10, normalizedTerm.split(' ').length + 3)
        continue
      }

      if (normalizedTerm.includes(normalizedInput) && normalizedInput.length > 4) {
        score += 4
      }
    }

    if (score > bestScore) {
      bestScore = score
      bestScenario = scenario
    }
  }

  return bestScore > 0 ? bestScenario : getScenarioById()
}
