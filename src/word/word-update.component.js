import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'

import { READ_WORD } from './word.query'
import { UPDATE_WORD } from './word.mutation'

export default class extends Component {
  render() {
    let name
    return (
      <Query
        query={READ_WORD}
        variables={{ wordId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`

          return (
            <Mutation
              mutation={UPDATE_WORD}
              key={data.word._id}
              onCompleted={() => this.props.history.push(`/`)}
            >
              {(updateWord, { loading, error }) => (
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">EDIT WORD</h3>
                    </div>
                    <div className="panel-body">
                      <h4>
                        <Link to="/" className="btn btn-primary">
                          Word list
                        </Link>
                      </h4>
                      <form
                        onSubmit={e => {
                          e.preventDefault()
                          updateWord({
                            variables: {
                              wordId: data.word._id,
                              name: name.value
                            }
                          })
                          name.value = ''
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="name">Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            ref={node => {
                              name = node
                            }}
                            placeholder="Name"
                            defaultValue={data.word.title}
                          />
                        </div>
                        <button type="submit" className="btn btn-success">
                          Submit
                        </button>
                      </form>
                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                    </div>
                  </div>
                </div>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}
