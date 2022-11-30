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
          <Main title="Report">
            Based on the results of the sentiment analysis, it can be deduced that Twitter users from the United Kingdom are skewed towards negative tweets with counts taking as much as 59.52%. Top keywords from the analysis also support this deduction
          </Main>
        </Route>

        <Route path='/dashboard/usa'>
          <Dashboard country="United State of America">
            <iframe title="Dashboard USA" width="100%" height="100%" src="https://app.powerbi.com/reportEmbed?reportId=46376b84-294c-4a9c-a680-5785e41275bd&autoAuth=true&ctid=e757cfdd-1f35-4457-af8f-7c9c6b1437e3" frameborder="0" allowFullScreen="true"></iframe>
          </Dashboard>
          <Main title="Report">
            USA's content
          </Main>
        </Route>

        <Route path='/dashboard/spain'>
          <Dashboard country="Spain">
            <iframe title="Dashboard Spain" width="100%" height="100%" src="https://app.powerbi.com/reportEmbed?reportId=8ba28e29-3bdf-46e8-921c-414b167149f6&autoAuth=true&ctid=e757cfdd-1f35-4457-af8f-7c9c6b1437e3" frameborder="0" allowFullScreen="true"></iframe>
          </Dashboard>
          <Main title="Report">
            Spain's content
          </Main>
        </Route>
        <Footer />

      </Route>

    </Switch >

  );
}
