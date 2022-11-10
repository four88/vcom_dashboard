export default function Card({
  cardImg,
  cardTitle,
  cardDesc
}) {

  return (

    <div className="card">
      <img className="card__img"
        alt="cardImg"
        src={cardImg}
      />

      <div className="card__content">
        <h2 className="card__title">
          {cardTitle}
        </h2>
        <p className="card__desc">
          {cardDesc}
        </p>
      </div>

    </div>


  )
}
