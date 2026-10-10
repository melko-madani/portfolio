import { content } from '../content'
import { Cta } from '../components/ui'

export function NotFound() {
  const { ui } = content
  return (
    <section className="container-grid flex min-h-[70dvh] flex-col justify-center pb-24 pt-32">
      <p className="eyebrow">404</p>
      <h1 className="display-lg mt-6 max-w-[16ch]">{ui.notFound.heading}</h1>
      <p className="lede mt-6">{ui.notFound.text}</p>
      <div className="mt-10">
        <Cta to="/">{ui.notFound.cta}</Cta>
      </div>
    </section>
  )
}
