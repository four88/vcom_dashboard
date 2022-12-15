import React from 'react';
import Header from '../Header/Header';
import About from '../About/About';
import Tools from '../Tools/Tools';
import Card from '../Card/Card';
import { Switch, Route } from "react-router-dom";
import Member from '../Member/Member';
import Avatar from '../Avatar/Avatar';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Selection from '../Selection/Selection';
import Country from '../Country/Country';
import Dashboard from '../Dashboard/Dashboard';
import Documentation from '../Documentation/Documentation';
import biImg from '../../images/bi.svg';
import pyImg from '../../images/python.png';
import azureImg from '../../images/azure.png';
import reactImg from '../../images/react.png';
import gbengaImg from '../../images/gbenga.png';
import tjImg from '../../images/tj.png';
import fourImg from '../../images/four.png';

export default function App() {

  const cardInfo = [
    {
      title: "Python",
      img: pyImg,
      desc: "Python provide many library that very useful scraping data from twitter. On this project we decide to using Twint for data collection."
    },
    {
      title: "Power Bi",
      img: biImg,
      desc: "Using Power BI for analyze The result, Find user insigh and create Data dashboard"
    },
    {
      title: "Azure",
      img: azureImg,
      desc: "Azure provide Cognative service for text analytic work. Sentiment Analysis and Keyphrases API are the best that we use on this project"
    },
    {
      title: "React",
      img: reactImg,
      desc: "For present the result of this project, We create a website to show the dashboard from power BI.React is the part that we using for create frontend part"
    }
  ]


  const avatarInfo = [
    {
      name: "Pharanyu Chuenjit",
      img: fourImg,
      major: "MSc Computer Science"
    },
    {
      name: "Olateju Olayiwola",
      img: tjImg,
      major: "MSc Infomation Science (Data Analytic)"
    },
    {
      name: "Gbenga Adejuwon",
      img: gbengaImg,
      major: "MSc Infomation Science (Data Analytic)"
    },
  ]

  return (
    <Switch>
      <Route exact path='/'>
        <Header heading="About Project" />
        <About />
        <Tools >
          {cardInfo.map((item) => {
            return (
              <Card
                cardImg={item.img}
                cardTitle={item.title}
                cardDesc={item.desc}
              />
            )
          })}
        </Tools>
        <Member>
          {avatarInfo.map((item) => {
            return (
              <Avatar
                name={item.name}
                img={item.img}
                major={item.major}
              />
            )
          })}
        </Member>
        <Footer />
      </Route>

      <Route path='/docs'>
        <Header heading="Documentation" />
        <Main>
          <Documentation />
        </Main>
        <Footer />
      </Route>

      <Route path='/dashboard'>
        <Header heading="Dashboard" />
        <Selection>
          <Country
            country="United Kingdom"
            toPath="/dashboard"
          />
          <Country
            country="USA"
            toPath="/dashboard/usa"
          />
          <Country
            country="Spain"
            toPath="/dashboard/spain"
          />
        </Selection>

        <Route exact path='/dashboard'>
          <Dashboard country="United Kingdom">
            <iframe title="Dashboard UK" width="100%" height="100%" src="https://app.powerbi.com/reportEmbed?reportId=40c6a97b-1356-47e6-b75e-d494fd40eea4&autoAuth=true&ctid=e757cfdd-1f35-4457-af8f-7c9c6b1437e3" frameborder="0" allowFullScreen="true"></iframe>
          </Dashboard>
          <Main >
            <p className='report'>
              Top in the list of negative keywords are flood, government, climate change, land, country, storm, and rainfall. Top in the list of positive keywords are flood, river, land, project, flood resilience, drainage and government. Top in the list of mixed keywords are flood, government, safety, country, bad weather, wildlife, solution and disaster. An analysis of the tweets show that the contents of the tweet is in line with the sentiments. Also, government is a common keyword which shows people who tweeted holds the government accountable for the flood which has occured and expect so much from the government. An analysis of the sentiment shows that the negative sentiments have the highest count followed by Neutral and then positive. This is expected as flood is not pleasant and the effect is usually negative. Taking a closer look at the sentiments, the trend has been on the decrease from the begining of the period with lowest being quarter 3 of 2022 for positive, neutral and negative sentiments.
            </p>
          </Main>
        </Route>

        <Route path='/dashboard/usa'>
          <Dashboard country="United State of America">
            <iframe title="Dashboard USA" width="100%" height="100%" src="https://app.powerbi.com/reportEmbed?reportId=46376b84-294c-4a9c-a680-5785e41275bd&autoAuth=true&ctid=e757cfdd-1f35-4457-af8f-7c9c6b1437e3" frameborder="0" allowFullScreen="true"></iframe>
          </Dashboard>
          <Main >
            <p className='report'>
              Top on the list of keywords which is common to positive, negative keywords is the flood. The frequency of the flood word-count is significantly much as compared to other keywords across-board. For negative keyword, top on the list following flood is storm, damage, emergency, rainfall, climate change, government and business. For positive keywords, top on the list of the keywords is media, insurance, air ambulance, project, report, government, debris and drainage. For neutral keywords, top on the list are warning,report, new, update, location, safety and flood alert. An anlysis of the tweets shows that the content is in line with the sentiment. For the sentiment result analysis, the counts for negative, positive and neutral are very close percentage wise with negative having 34%, positive 34% and neutral 31%. For the period under review, the sentiment counts per quarter has not had a regular partern all through the period
            </p>
          </Main>
        </Route>

        <Route path='/dashboard/spain'>
          <Dashboard country="Spain">
            <iframe title="Dashboard Spain" width="100%" height="100%" src="https://app.powerbi.com/reportEmbed?reportId=8ba28e29-3bdf-46e8-921c-414b167149f6&autoAuth=true&ctid=e757cfdd-1f35-4457-af8f-7c9c6b1437e3" frameborder="0" allowFullScreen="true"></iframe>
          </Dashboard>
          <Main>
            <p className='report'>
              For the keywords, flood is top on the list and common to negative, positive and neutral keywords. For negative keywords, top on the list are damage, storm, government, climate change, rainfall and emergency. For positive keywords, top on the list are rain, people, support, media, government and wildfire.  Analysin the tweets as well, it shows that they are in line with the keywords and then sentiment. Analysing the sentiment shows that the negative sentiment is top on the list with 37% followed closely by positive sentiments with 34% and then neutral by 28%. Over the period, an analysis of the sentiments show that 2017 had the highest with the lowest being 2011.
            </p>
          </Main>
        </Route>
        <Footer />

      </Route>

    </Switch >

  );
}
