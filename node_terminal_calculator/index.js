import readline from 'node:readline'

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('Welcome to the Node Calculator!')
console.log(`Type 'exit' or Ctrl+C to exit`)
console.log('______________________________')

reader.on('close', () => {
  console.log('\n BYE BYE !!!')
  process.exit(0);
})

const calculatorRunner = CalculatorRunner()
let operation = ''
let result = 0

console.log(` ${result}`)

calculatorRunner.next()


function *CalculatorRunner() {
  while (true) {
    reader.question(' > ', handlePromptInput);
    yield
  }
}

function handlePromptInput(input) {
  if (input === 'exit') {
    reader.close()
    return
  }

  let newOperation = operation + input

  try {
    const lastChar = newOperation[newOperation.length -1]

    switch (lastChar) {
      case 'c': {
        operation = result = 0
        console.log(` ${result}`)
        break
      }
      case '!': {
        operation = result = (result * -1)
        console.log(` ${result}`)
        break
      }
      case '=': {
        newOperation = newOperation.substring(0, newOperation.length -1)

        result = eval(newOperation)

        console.log(` ${result}`)
        operation = String(result)
        break
      }
      default: {
        result = eval(newOperation)
        operation = newOperation
        console.log(getLastNumber(operation))
      }
    }

    calculatorRunner.next()
  } catch (e) {
    console.log('Bad data! Ignored')
    console.log(getLastNumber(operation))
    calculatorRunner.next()
  }
}

function getLastNumber(_operation) {
  const lastNumber = _operation.split(/[+\-\/*]/).pop()
  const isLastNumberNegative =
    _operation?.[_operation.length - lastNumber.length -1] === '-'

  return isLastNumberNegative ? ` -${lastNumber}` : ` ${lastNumber}`
}



