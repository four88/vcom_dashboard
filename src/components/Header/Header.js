import Nav from '../Nav/Nav';

export default function Header({
  heading
}) {

  return (

    <header className="header">
      <h1 className="header__heading">
        {heading}
      </h1>
      <Nav />
    </header>
  )
}
