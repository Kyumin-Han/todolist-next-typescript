import { useState, useRef } from 'react'
import produce from 'immer'

const InputBox = ({ todoList, setTodoList }) => {
  const [text, setText] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const inputRef = useRef(null)
  const fileInput = useRef(null)

  const initialTodo = {
    id: todoList.length,
    text,
    checked: false,
    fileUrl: fileUrl ? fileUrl : '',
  }

  const onChangeInput = e => {
    setText(e.target.value)
  }

  const onChangeFile = e => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result

      setFileUrl(previewImgUrl)
    }
  }

  const onClickAddButton = e => {
    e.preventDefault()
    // const nextTodoList = todoList.concat({
    //   id: todoList.length,
    //   text,
    //   checked: false,
    //   fileUrl: fileUrl ? fileUrl : "",
    // });
    // setTodoList(nextTodoList);

    const nextTodoList = produce(todoList, draft => {
      draft.push({
        id: todoList.length,
        text,
        checked: false,
        fileUrl: fileUrl ? fileUrl : '',
      })
    })

    setTodoList(nextTodoList)

    setText('')
    setFileUrl('')
    inputRef.current.focus()
    fileInput.current.value = ''
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-white">
              <thead className="bg-gray-50"></thead>
              <tbody className="bg-indigo-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <h1 className="text-5xl text-white">TodoList</h1>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-thin">
                    <form onSubmit={onClickAddButton}>
                      <div>
                        <input
                          className="w-full border-gray-300 px-2 transition-all border-blue rounded-sm m-auto"
                          type="text"
                          placeholder="할 일을 입력해주세요"
                          value={text}
                          ref={inputRef}
                          onChange={onChangeInput}
                        />
                        <br />
                        <input
                          className="w-full border-gray-300 px-2 transition-all border-blue rounded-sm m-auto"
                          type="file"
                          ref={fileInput}
                          onChange={onChangeFile}
                        />
                      </div>
                    </form>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-white font-bold leading-normal">
                    <button
                      type="submit"
                      onClick={onClickAddButton}
                      className="shadow w-32 border-white-800 border-2 rounded-full focus:outline-none focus:border-white px-4 py-2 text-white hover:bg-white hover:text-black"
                    >
                      저장
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InputBox
