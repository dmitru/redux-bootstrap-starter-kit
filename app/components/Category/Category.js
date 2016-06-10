/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'

const Category = ({ name }) => (
  <div>
    {name}
  </div>
)

Category.propTypes = {
  name: React.PropTypes.string.isRequired,
}

export default Category
