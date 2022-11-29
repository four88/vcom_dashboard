import React from 'react';

export default function Main({ children, title }) {
  return (
    <>
      <h2 className="selection__heading dashboard__heading main__heading">
        {title}
      </h2>
      <section className="dashboard main">
        <div className="dashboard__container main__container">
          {children}
        </div>
      </section>
    </>
  )

}
