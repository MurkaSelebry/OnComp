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
        const selectedLanguage = document.getElementById('language').value;
        sendCodeToCompiler(selectedLanguage,code,inputData,compilerOptions,commandLineArgs);
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

    function sendCodeToCompiler(selectedLanguage,code,inputData,compilerOptions,commandLineArgs) {
      const url = window.location.pathname; 
      const fullUrl = `${window.location.protocol}//${window.location.host}${url}run`;
      if(compilerOptions=="") compilerOptions = "timeLimit=2 memoryLimit=128000"
      const parts = compilerOptions.split('=');
      
      const timeLimitValue = parseInt(parts[1].split(' '), 10);
      const memoryLimitValue = parseInt(parts[2], 10);

      const data = {
        language: selectedLanguage,
        code: code,
        stdin: inputData,
        options: {
          timeLimit: timeLimitValue,
          memoryLimit: memoryLimitValue
        }
      };
      console.log(timeLimitValue)
      console.log(memoryLimitValue)
      fetch(fullUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      })
      .then(response => response.json()) 
      .then(data => writeToOutput(data))
      .catch((error) => console.error('Error:', error))
    }

    function writeToOutput(data) {
      const outputField = document.getElementById('output');
      outputField.value += "Output:"+data.output + "\n";
      outputField.value += "Status:"+data.status + "\n";
      outputField.value += "Time:"+data.time + "seconds\n";
      outputField.value += "Memory:"+data.memory + "KB\n";
      outputField.value += "Program finished\n\n\n";

    }

    function sendLanguageToCompiler(language) {
      console.log("Отправка выбранного языка в компилятор:");
      console.log(language);
    }