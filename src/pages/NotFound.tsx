import { Cta } from '../components/ui'
import { useContent, useHref } from '../lib/locale'

export function NotFound() {
  const { ui } = useContent()
  const href = useHref()
  return (
    <section className="container-grid flex min-h-[70dvh] flex-col justify-center pb-24 pt-32">
      <p className="eyebrow">404</p>
      <h1 className="display-lg mt-6 max-w-[16ch]">{ui.notFound.heading}</h1>
      <p className="lede mt-6">{ui.notFound.text}</p>
      <div className="mt-10">
        <Cta to={href('/')}>{ui.notFound.cta}</Cta>
      </div>
    </section>
  )
}
