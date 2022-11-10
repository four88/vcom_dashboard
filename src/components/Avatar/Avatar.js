export default function Avatar({
  name,
  major,
  img
}) {

  return (
    <div className="avatar">
      <img className="avatar__img"
        alt="avater"
        src={img}
      />
      <div className='avatar__content'>
        <h2 className="avatar__title">
          {name}
        </h2>
        <p className="avatar__major">
          {major}
        </p>
      </div>
    </div>
  )
}
