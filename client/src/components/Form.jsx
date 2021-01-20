import React, { useState } from 'react'
import { Button } from './index'
import { useMutation } from '@apollo/client'
import { ADD_MOVIE, EDIT_MOVIE, ADD_SERIES, EDIT_SERIES } from '../services'
import { toggleModal } from '../cache'

function Form ({ toggleForm, refetch, isEdit, toggleEdit, service }) {
  const [input, setInput] = useState(isEdit ? isEdit : {
    title: '',
    overview: '',
    popularity: '',
    poster_path: '',
    tags: []
  })
  const [addMovie] = useMutation(ADD_MOVIE, {
    onCompleted: () => {
      refetch()
      close()
      toggleModal({dialog: 'Success Add Movie', type: 'success'})
    },
    onError: () => {
      toggleModal({dialog: 'Sorry, there is an error', type: 'error'})
    }
  })
  const [editMovie] = useMutation(EDIT_MOVIE, {
    onCompleted: () => {
      refetch()
      close()
      toggleModal({dialog: 'Success Edit Movie', type: 'success'})
    },
    onError: () => {
      toggleModal({dialog: 'Sorry, there is an error', type: 'error'})
    }
  })
  const [addSeries] = useMutation(ADD_SERIES, {
    onCompleted: () => {
      refetch()
      close()
      toggleModal({dialog: 'Success Add Series', type: 'success'})
    },
    onError: () => {
      toggleModal({dialog: 'Sorry, there is an error', type: 'error'})
    }
  })
  const [editSeries] = useMutation(EDIT_SERIES, {
    onCompleted: () => {
      refetch()
      close()
      toggleModal({dialog: 'Success Edit Series', type: 'success'})
    },
    onError: () => {
      toggleModal({dialog: 'Sorry, there is an error', type: 'error'})
    }
  })

  const initTags = ['kid', 'animation', 'fantasy', 'adult', 'action', 'myth', 'pokemon', 'horror', 'war', 'america', 'indonesia', 'japan']
  initTags.sort()

  const inputChange = (e) => {
    let { name, value } = e.target
    if (name === 'tags') {
      const newInput = JSON.parse(JSON.stringify(input))
      const newTags = newInput.tags
      if (newTags.includes(value)) {
        const deleteTags = newTags.filter(e => e !== value)
        setInput({
          ...input,
          tags: deleteTags
        })
      } else {
        newTags.push(value)
        setInput({
          ...input,
          tags: newTags
        })
      }
    } else {
      if (name === 'popularity') {
        value = Number(value)
      }
      setInput({
        ...input,
        [name]: value
      })
    }
  }

  const submitting = (e) => {
    e.preventDefault()
    const warnings = []
    if (input.title === '' || input.title.trim() === '') {
      warnings.push('Title Required')
    }
    if (input.overview === '' || input.overview.trim() === '') {
      warnings.push('Overview Required')
    }
    if (input.poster_path === '' || input.poster_path.trim() === '') {
      warnings.push('Poster Path Required')
    }
    if (input.popularity === '' || input.popularity < 0 || input.popularity > 5) {
      warnings.push('Popularity Must Between 0 - 5')
    }

    const warning = warnings.join(', ')

    if (warnings.length > 0) {
      toggleModal({dialog: warning, type: 'error'})
    } else {
      if (service === 'movies') {
        if (isEdit) {
          editMovie({variables: input})
        } else {
          addMovie({variables: input})
        }
      } else if (service === 'series') {
        if (isEdit) {
          editSeries({variables: input})
        } else {
          addSeries({variables: input})
        }
      }
    }
  }

  const clearing = () => {
    setInput({
      title: '',
      overview: '',
      popularity: '',
      tags: []
    })
  }
  
  const close = () => {
    toggleEdit(false)
    toggleForm(false)
  }

  return (
    <div className="fixed z-30 modal bg-gray-800 bg-opacity-30 p-10">
      <div className="container w-7/12 mx-auto bg-white text-black border-4 rounded-lg p-5 shadow-2xl mt-10">
        <div className="flex justify-end">
          <Button name="Close" icon="cancel" func={close}/>
        </div>
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-3xl mb-3">{isEdit ? 'EDIT' : 'ADD'} FORM</h1>
          <form onSubmit={(e) => submitting(e)} className="flex justify-center flex-wrap">
            <input
              name="title"
              className="input"
              type="text"
              placeholder="Title"
              value={input.title}
              onChange={inputChange}
            />
            <input
              name="poster_path"
              className="input"
              type="text"
              placeholder="Poster"
              value={input.poster_path}
              onChange={inputChange}
            />
            <textarea
              name="overview"
              className="input resize-none"
              placeholder="Overview"
              value={input.overview}
              onChange={inputChange}
            />
            <input
              name="popularity"
              type="number"
              className="input"
              placeholder="Popularity"
              min="0"
              max="5"
              step="0.1"
              value={input.popularity}
              onChange={inputChange}
            />
            <div className="w-7/12">
              <div className="flex flex-wrap">
              <p className="font-semibold mr-1">Tags :</p>
                {
                  initTags.map((e, idx) => (
                    <label
                      key={idx}
                      className="mx-1 capitalize"
                    >
                      <input
                        type="checkbox"
                        name="tags"
                        className="mr-1"
                        onChange={inputChange}
                        checked={input.tags.includes(e)}
                        value={e}
                      />
                      {e}
                    </label>
                  ))
                }
              </div>
            </div>
            <div className="w-7/12 flex justify-center mt-2">
              <Button type="submit" name={isEdit ? 'Edit Data' : 'Add Data'} color="green" />
              {
                isEdit ? '' : <Button name="Clear" func={clearing} color="yellow" />
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form