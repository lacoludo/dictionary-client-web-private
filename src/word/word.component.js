import React from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Mutation } from 'react-apollo'

import { READ_WORD } from './word.query'
import { DELETE_WORD } from './word.mutation'

export default () => {
  const { push } = useHistory()
  const { params } = useRouteMatch()
  const { loading, error, data } = useQuery(READ_WORD, {
    pollInterval: 500,
    variables: {
      wordId: params.id
    }
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            <Link to="/">Word List</Link>
          </h4>
          <h3 className="panel-title">{data.word.name}</h3>
        </div>
        <div className="panel-body">
          <dl>
            <dt>Name:</dt>
            <dd>{data.word.name}</dd>
          </dl>
          <Mutation
            mutation={DELETE_WORD}
            key={data.word._id}
            onCompleted={() => push('/')}
          >
            {(deleteWord, { loading, error }) => (
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    deleteWord({
                      variables: {
                        wordId: data.word._id
                      }
                    })
                  }}
                >
                  <Link
                    to={`/word/${data.word._id}/update`}
                    className="btn btn-success"
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button type="submit" className="btn btn-danger">
                    Delete
                  </button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </div>
            )}
          </Mutation>
        </div>
      </div>
    </div>
  )
}
