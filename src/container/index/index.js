class Todo {
  static #count = 0

  static #list = []

  static #block = null
  static #template = null
  static #input = null
  static #button = null

  static init = () => {
    this.#template =
      document.querySelector(
        '#task',
      ).content.firstElementChild

    this.#block = document.querySelector('.task__list')

    this.#input = document.querySelector('.form__input')

    this.#button = document.querySelector('.form__button')

    console.log(
      this.#block,
      this.#button,
      this.#input,
      this.#template,
    )

    this.#render()

    this.#button.onclick = this.#handleAdd
  }

  static #render = () => {
    this.#block.innerHTML = ''

    if (this.#list.length === 0) {
      this.#block.innerText = `Список задач пустий`
    } else {
      this.#list.forEach((taskData) => {
        const el = this.#createTaskElem(taskData)
        this.#block.append(el)
      })
    }
  }

  static #createTaskData = (text) => {
    this.#list.push({
      id: ++this.#count,
      text,
      view: false,
    })
  }

  static #createTaskElem = (data) => {
    const el = this.#template.cloneNode(true)

    const [id, text, btnDo, btnCancel] = el.children

    id.innerText = `${data.id}.`

    text.innerText = data.text

    btnDo.onclick = this.#handleDo(data, btnDo, el)

    btnCancel.onclick = this.#handleCancel(data)

    return el
  }

  static #handleDo = (data, btn, el) => () => {
    const result = this.#toggleDone(data.id)

    if (result === true || result === false) {
      el.classList.toggle('task--done')
      btn.classList.toggle('task__button--do')
      btn.classList.toggle('task__button--done')
    }
  }

  static #handleCancel = (data) => () => {
    const result = this.#deleteById(data.id)
    if (result) this.#render()
  }

  static #deleteById = (id) => {
    if (confirm('Видалити задачу?')) {
      this.#list = this.#list.filter(
        (item) => item.id !== id,
      )
      return true
    } else {
      return false
    }
  }

  static #toggleDone = (id) => {
    const task = this.#list.find((item) => item.id === id)

    if (task) {
      task.done = !task.done
      return task.done
    } else {
      return null
    }
  }

  static #handleAdd = () => {
    this.#createTaskData(this.#input.value)
    this.#render()
    this.#input.value = ''
  }
}

Todo.init()

window.todo = Todo
