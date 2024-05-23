document.addEventListener('DOMContentLoaded', (event) => {
    /*const textarea = document.querySelector('textarea')
    const lineNumbers = document.querySelector('.line-numbers')

      textarea.addEventListener('keyup', event => {
        const numberOfLines = event.target.value.split('\n').length

        lineNumbers.innerHTML = Array(numberOfLines)
          .fill('<span></span>')
          .join('')
      })

      textarea.addEventListener('keydown', event => {
        if (event.key === 'Tab') {
          const start = textarea.selectionStart
          const end = textarea.selectionEnd

          textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end)
          textarea.focus()      

          event.preventDefault()
        }
      })
      */
      const editors = [
        { textarea: document.getElementById('editor'), lineNumbers: document.getElementById('editor-line-numbers') },
        { textarea: document.getElementById('input'), lineNumbers: document.getElementById('input-line-numbers') },
        { textarea: document.getElementById('output'), lineNumbers: document.getElementById('output-line-numbers') }
    ];

    editors.forEach(editor => {
        updateLineNumbers(editor.textarea, editor.lineNumbers);

        editor.textarea.addEventListener('input', () => {
            updateLineNumbers(editor.textarea, editor.lineNumbers);
        });
        editor.textarea.addEventListener('keydown', event => {
          if (event.key === 'Tab') {
            const start = editor.textarea.selectionStart
            const end = editor.textarea.selectionEnd
  
            editor.textarea.value = editor.textarea.value.substring(0, start) + '\t' + editor.textarea.value.substring(end)
            editor.textarea.focus()      
  
            event.preventDefault()
          }
        });
    });

      document.getElementById('run-button').addEventListener('click', () => {
        const code = document.getElementById('editor').value;
        const inputData = document.getElementById('input').value;
        const compilerOptions = document.getElementById('compiler-options').value;
        const commandLineArgs = document.getElementById('command-arguments').value;

        sendCodeToCompiler(code);
        sendInputDataToCompiler(inputData);
        sendCompilerOptionsToCompiler(compilerOptions);
        sendCommandLineArgsToCompiler(commandLineArgs);
    });

    document.getElementById('language').addEventListener('change', () => {
      const selectedLanguage = document.getElementById('language').value;
      sendLanguageToCompiler(selectedLanguage);
    });

});

function updateLineNumbers(textarea, lineNumbers) {
  const numberOfLines = textarea.value.split('\n').length;
  lineNumbers.innerHTML = Array(numberOfLines).fill('<span></span>').join('');
}

    function sendCodeToCompiler(code) {
        console.log("Отправка кода в компилятор:");
        console.log(code);
    }

    function sendInputDataToCompiler(inputData) {
        console.log("Отправка входных данных в компилятор:");
        console.log(inputData);
    }

    function sendCompilerOptionsToCompiler(options) {
        console.log("Отправка опций компилятора в компилятор:");
        console.log(options);
    }

    function sendCommandLineArgsToCompiler(args) {
        console.log("Отправка аргументов командной строки в компилятор:");
        console.log(args);
    }

    function writeToOutput(data) {
      const outputField = document.getElementById('output');
      outputField.value += data + "\n";
    }

    function sendLanguageToCompiler(language) {
      console.log("Отправка выбранного языка в компилятор:");
      console.log(language);
    }