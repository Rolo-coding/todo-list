import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import('./style.scss')

const App = () => {
  const [itemList, setList] = useState([])
  const [input, setInput] = useState('')

  const GetItems = itemList.map((item, id) => {
    return (
      <li className='todolist__item' key={id}>
        <input
          type='checkbox'
          onClick={(e) => {
            checkTodo(e, id)
          }}></input>
        <span>{item}</span>
        <button
          className='item-deletebtn'
          onClick={(e) => {
            DeleteItems(id)
          }}>
          X
        </button>
      </li>
    )
  })

  const AddItems = (e) => {
    e.preventDefault()
    const tempList = [...itemList]
    tempList.push(input)
    setList(tempList)
    setInput('')
  }

  const DeleteItems = (id) => {
    const tempList = [...itemList]
    const listTodo = document.querySelectorAll('li.todolist__item')
    if (tempList[id + 1] != null) {
      const checkedNextItem = listTodo[id + 1].querySelector('input').checked
      if (!checkedNextItem) {
        listTodo[id].querySelector('input').checked = false
        document.querySelectorAll('span')[id].style.textDecoration = 'none'
      }
    }
    tempList.splice(id, 1)
    setList(tempList)
  }

  const checkTodo = (e, id) => {
    const span = document.querySelectorAll('span')
    const checked = e.target.checked
    if (checked) {
      span[id].style.textDecoration = 'line-through'
    } else {
      span[id].style.textDecoration = 'none'
    }
  }

  return (
    <div className='todolist'>
      <h1 className='todolist__title'>Todolist</h1>
      <form className='todolist__submit'>
        <input
          className='submit__input'
          onChange={(e) => {
            setInput(e.target.value)
          }}
          value={input}
          type='text'></input>
        <button className='submit__btn' onClick={AddItems}>
          Add
        </button>
      </form>
      <ul className='todolist__list'>{GetItems}</ul>
    </div>
  )
}
export default App

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
