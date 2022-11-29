import React from 'react';
export default function Selection({ children }) {

  return (
    <>
      <h2 className="selection__heading">
        Select country
      </h2>
      <section className="selection">

        <div className="selection__container">
          {children}
        </div>
      </section>
    </>
  )
}
