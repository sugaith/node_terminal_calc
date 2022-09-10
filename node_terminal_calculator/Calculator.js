export default function Calculator(_reader) {
  let operation = ''
  let result = 0
  let calculatorRunner = null

  this.run = () => {
    console.log(` ${result}`)

    calculatorRunner = CalculatorRunner()
    calculatorRunner.next()
  }

  function *CalculatorRunner() {
    while (true) {
      _reader.question(' > ', handlePromptInput);
      yield
    }
  }

  function handlePromptInput(input) {
    if (input === 'exit') {
      _reader.close()
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
}

function getLastNumber(_operation) {
  const lastNumber = _operation.split(/[+\-\/*]/).pop()
  const isLastNumberNegative =
    _operation?.[_operation.length - lastNumber.length -1] === '-'

  return isLastNumberNegative ? ` -${lastNumber}` : ` ${lastNumber}`
}
