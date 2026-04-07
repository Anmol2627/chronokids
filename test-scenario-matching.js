// Test script to verify scenario matching logic
import { customScenarios } from './lib/custom-scenarios'

// Test the matching logic
function testScenarioMatching(adventureText: string) {
  console.log(`Testing: "${adventureText}"`)
  
  let currentScenario = null
  
  // Try exact matching first
  for (const [key, scenario] of Object.entries(customScenarios)) {
    console.log(`Checking scenario: ${key}, title: ${scenario.title}`)
    
    // Check if adventure title contains scenario title (without emoji)
    const scenarioTitle = scenario.title.split('!')[0].trim()
    if (adventureText.includes(scenarioTitle)) {
      console.log(`Found match: ${key}`)
      currentScenario = scenario
      break
    }
    
    // Check if adventure contains the scenario key
    if (adventureText.toLowerCase().includes(key.toLowerCase())) {
      console.log(`Found match by key: ${key}`)
      currentScenario = scenario
      break
    }
  }
  
  // If still no match, try emoji matching
  if (!currentScenario) {
    for (const [key, scenario] of Object.entries(customScenarios)) {
      if (adventureText.includes(scenario.emoji)) {
        console.log(`Found match by emoji: ${key}`)
        currentScenario = scenario
        break
      }
    }
  }
  
  if (currentScenario) {
    console.log(`SUCCESS: Matched to ${currentScenario.character.name}`)
    console.log(`Character: ${currentScenario.character.emoji} ${currentScenario.character.name}`)
    console.log(`Environment: ${currentScenario.environment.setting}`)
  } else {
    console.log('FAILED: No match found')
  }
  
  console.log('---')
}

// Test all the adventure chips
console.log('Testing Scenario Matching Logic')
console.log('================================')

const testAdventures = [
  '??When electricity was discovered!',
  '??Moon Landing 1969!',
  '??Newton and the apple!',
  '??Ancient Egypt with Cleopatra!',
  '??Wright Brothers first flight!',
]

testAdventures.forEach(testScenarioMatching)
