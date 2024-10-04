class Task{
    constructor(id, text, isDone){
        this.id = id;
        this.text = text;
        this.isDone = isDone;
    }

    get(){
        return this
    }
}

class TaskList{
    constructor(){
        this.list = [];
    }

    add(task){
        this.list.push(task);
    }
    
    remove(id){
        this.list = this.list.filter(task => task.get().id !== id);
    }

    clearAll(){
        this.list = []
    }
    
    clearDone(){
        this.list = this.list.filter(task => task.get().isDone == false)
    }

    get() {
        return this.list.map(task => task.get());
    }
}

class App extends TaskList{
    constructor() {
      // Создаем главный контейнер приложения и добавляем его в DOM
      super()
      this.appInput = document.createElement('div');
      this.appInput.className = 'input';
      this.appTasks = document.createElement('div');
      this.appTasks.className = 'tasks'
      document.body.append(this.appInput);
      document.body.append(this.appTasks);
      // Создаем интерфейс приложения
      this.createInterface();
    }
  
    createInterface() {
        const input = document.createElement('input')
        input.type = 'text'
        input.id = 'input'
        input.name = 'task'
        input.placeholder = 'Добавьте новую задачу'
        this.appInput.append(input);

        const inputBtn = document.createElement('button')
        inputBtn.onclick = () => this.onAdd()
        inputBtn.id = 'addBtn'
        inputBtn.append('+')
        this.appInput.append(inputBtn)

        const clearAllBtn = document.createElement('button')
        clearAllBtn.append("Очистить все задачи")
        clearAllBtn.style.width = "80px"
        clearAllBtn.style.fontSize = "14px"
        clearAllBtn.onclick = () => this.onClearAll()
        this.appInput.append(clearAllBtn)

        const clearDoneBtn = document.createElement('button')
        clearDoneBtn.append("Очистить выполненные задачи")
        clearDoneBtn.style.width = "100px"
        clearDoneBtn.style.fontSize = "14px"
        clearDoneBtn.style.height = "60px"
        clearDoneBtn.onclick = () => this.onClearDone()
        this.appInput.append(clearDoneBtn)

        const tasksLabel = document.createElement('h2')
        tasksLabel.append('Список заданий')
        this.appTasks.append(tasksLabel)
    }
  
    onAdd() {
      // Логика добавления контакта
      let id = -1;
      if(this.get().length != 0){
        id = this.get()[this.get().length - 1].id + 1;
      }
      else{
        id = 1;
      }

      const text = document.getElementById('input').value;
      if(text.length != 0){
          const task = new Task(id, text.trim(), false);
          super.add(task);
          this.get();
          document.getElementById('input').value = "";
      }
    }
  
    onRemove(id) {
      // Логика удаления контакта
      super.remove(id);
      this.get();
    }

    onClearAll(){
        super.clearAll()
        this.get()
    }

    onClearDone(){
        super.clearDone()
        this.get()
    }
  
    get() {
        // Получение и обновление списка задач
        const tasks = super.get();
        // Очищаем предыдущие задачи
        this.appTasks.querySelectorAll('.task').forEach(task => task.remove());
    
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            
            const text = document.createElement('p');
            text.append(task.text);
            // Задаем стиль для текста в зависимости от состояния
            if (task.isDone) {
                text.style.textDecoration = 'line-through';
                text.style.color = '#78CFB0'; // Цвет для зачеркинутого текста
            }
            taskDiv.append(text);
            
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.name = 'isDone';
            checkBox.checked = task.isDone;
            taskDiv.append(checkBox);
    
            // Обработчик изменения состояния чекбокса
            checkBox.addEventListener('change', () => {
                task.isDone = checkBox.checked;
                text.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
                text.style.color = checkBox.checked ? '#78CFB0' : '#9E78CF'; // Цвет текста
            });
            
            // Кнопка редактирования
            const editBtn = document.createElement('button');
            const editImg = document.createElement('img');
            editImg.src = 'img/edit.png'; // Путь к изображению редактирования
            editBtn.append(editImg);
            
            // Обработчик события для редактирования текста
            editBtn.onclick = () => {
                const newText = prompt('Измените текст задачи:', task.text);
                if (newText !== null && newText.trim() !== '') {
                    task.text = newText.trim();
                    text.innerText = task.text; // Обновляем текст на экране
                }
            };
            
            taskDiv.append(editBtn);
    
            const taskBtn = document.createElement('button');
            taskBtn.onclick = () => this.onRemove(task.id);
            
            const img = document.createElement('img');
            img.src = 'img/trash.png';
            taskBtn.append(img);
            taskDiv.append(taskBtn);
            
            this.appTasks.append(taskDiv);
        });
        return tasks;
    }
}

const app = new App()