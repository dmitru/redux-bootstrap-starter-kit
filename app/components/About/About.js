
import React from 'react'

import readme from '../../../README.md'

const About = () => (
  <div dangerouslySetInnerHTML={{ __html: readme }}></div>
)

export default About
