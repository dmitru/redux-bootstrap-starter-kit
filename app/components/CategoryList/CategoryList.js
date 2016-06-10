/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'

import Category from '../Category'

const CategoryList = ({ categories = [] }) => {
  const categoriesNotEmpty = categories.length > 0
  let content = []
  if (categoriesNotEmpty) {
    content = categories.map((category) => (
      <Category key={category.id} {...category} />
    ))
  }
  return (
    <div>
      {categoriesNotEmpty ? content : <span>No items to show.</span>}
    </div>
  )
}

CategoryList.propTypes = {
  categories: React.PropTypes.array,
}

export default CategoryList
