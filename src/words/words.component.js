import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { READ_WORDS } from './words.query'

export default () => {
  const { loading, error, data } = useQuery(READ_WORDS, {
    pollInterval: 500
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">List of words</h3>
          <h4>
            <Link to="/word-create">Create word</Link>
          </h4>
        </div>
        <div className="panel-body">
          <table className="table table-stripe">
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {data.words.map((word, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/word/${word._id}`}>{word.name}</Link>
                  </td>
                  <td>currently not available</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
