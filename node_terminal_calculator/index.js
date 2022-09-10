import readline from 'node:readline'
import Calculator from "./Calculator.js";

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
reader.on('close', () => {
  console.log('\n BYE BYE !!!')
  process.exit(0);
})

console.log('Welcome to the Node Calculator!')
console.log(`Type 'exit' or Ctrl+C to exit`)
console.log('______________________________')

const calculator = new Calculator(reader)

calculator.run()
