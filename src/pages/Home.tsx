import { About } from '../components/sections/About'
import { Capabilities } from '../components/sections/Capabilities'
import { Contact } from '../components/sections/Contact'
import { Experience } from '../components/sections/Experience'
import { Hero } from '../components/sections/Hero'
import { Work } from '../components/sections/Work'

export function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Capabilities />
      <Experience />
      <Contact />
    </>
  )
}
