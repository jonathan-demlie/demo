import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styled from 'styled-components'
import Welcome from '../components/Welcome'
import SampleTutors from '../components/SampleTutors'
import SampleSubjects from '../components/SampleSubjects'
export default function Home() {
  return (
    <div>
      <Navbar />
      <Welcome />
      <SampleTutors />
      <SampleSubjects />
      <Footer />
    </div>
  )
}
