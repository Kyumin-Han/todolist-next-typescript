import React from 'react'
import ToDoItem from './ToDoItem'

const TodoItemList = ({ title, todoList, setTodoList, checkedList }) => (
  <div className="bg-violet-200 container mb-2 flex mx-auto w-full items-center justify-center">
    <p>{title}</p>
    <ul className="flex flex-col p-4">
      {todoList &&
        todoList.map((todoItem, index) => {
          if (checkedList !== todoItem.checked) return null

          return (
            <ToDoItem
              key={todoItem.id}
              todoItem={todoItem}
              todoList={todoList}
              setTodoList={setTodoList}
              index={index}
            />
          )
        })}
    </ul>
  </div>
)

export default TodoItemList
