import React from 'react';

export default function Member({
  children
}) {

  return (
    <section className="tools member">
      <h2 className="tools__title member__title">
        Member
      </h2>
      <div className="tools__container member__container">
        {children}
      </div>
    </section>
  )
}
