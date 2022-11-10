export default function Tools({
  children
}) {
  return (
    <section className="tools">
      <h2 className="tools__title">
        Technologies
      </h2>
      <div className="tools__container">
        {children}
      </div>
    </section>
  )
}
