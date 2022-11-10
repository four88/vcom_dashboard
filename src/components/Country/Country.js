import { Link } from 'react-router-dom';
export default function Country({
  country,
  toPath
}) {

  return (

    <Link to={toPath}>
      <button type='button' className="country__button">
        {country}
      </button >
    </Link>
  )
}
