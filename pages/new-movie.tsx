import React from 'react'
import { Fragment } from 'react'
import HeadTag from '../components/HeadTag'
import Input from '../components/Input'

const NewMovie = () => {
  return (
    <Fragment>
      <HeadTag title="Add a new movie" description="You can add your favorite movie here" />
      <Input />
    </Fragment>
  )
}

export default NewMovie
