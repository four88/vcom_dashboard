import aboutImg from '../../images/about.png';
import { useHistory } from 'react-router-dom';
import React from 'react';

export default function About() {

  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/dashboard')
  }

  return (
    <section className="about">
      <div className='about__container'>
        <img className='about__img'
          alt='about'
          src={aboutImg}
        />
        <div className="about__content">
          <h2 className="about__heading">
            About this project
          </h2>
          <p className="about__text">
            This project is the part of Advanced practise program of University Of Northumbria.
            The propose of project is Analysing virtual communication to assess the emotional and behavioural impact of climate change.
            By Collect Tweet from Twitter and Applying Sentiment Mining techniques to understand and assess users’ opinions and sentiments regarding climate change
          </p>
          <p className="about__text">
            The processing of this project, First we selected top 3 countries that most has flooding disater.
            Then we using Azure cognative service for Sentiment Analysing and Keyphrases extraction.
            Finally, We Analyse the result to find user insight anc create the report and dashboard by using Power BI.

          </p>
          <button className="about__button"
            type='button'
            onClick={handleButtonClick}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </section >
  )
}
