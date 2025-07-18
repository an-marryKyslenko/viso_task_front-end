import RecipeForm from '@/app/components/forms/RecipeForm'
import Title from '@/app/components/ui/Title'
import React from 'react'

const Create = () => {

  
  return (
    <>
      <Title>Add Your Recipe</Title>

      <div className='bg-black/60 rounded-2xl'>
        <RecipeForm mode="create"/>
      </div>
    </>
  )
}

export default Create