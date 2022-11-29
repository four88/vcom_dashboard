import React from 'react';

export default function Dashboard({ children, country }) {

  return (
    <>
      <h2 className="selection__heading dashboard__heading">
        Dashboard of {country}
      </h2>
      <section className="dashboard">
        <div className="dashboard__container">
          {children}
        </div>
      </section>
    </>
  )
}
