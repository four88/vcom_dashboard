import Header from '../Header/Header';
import About from '../About/About';
import Tools from '../Tools/Tools';
import Card from '../Card/Card';
import { Switch, Route, useHistory } from "react-router-dom";
import Member from '../Member/Member';
import Avatar from '../Avatar/Avatar';
import Footer from '../Footer/Footer';
// import Main from '../Main/Main';
import Selection from '../Selection/Selection';
import Country from '../Country/Country';
import Dashboard from '../Dashboard/Dashboard';
import biImg from '../../images/bi.svg';
import pyImg from '../../images/python.png';
import azureImg from '../../images/azure.png';
import reactImg from '../../images/react.png';
import gbengaImg from '../../images/gbenga.png';
import tjImg from '../../images/tj.png';
import fourImg from '../../images/four.png';

export default function App() {

  const history = useHistory();

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

  const handleCountryClick = (path) => {
    history.push(`/dashboard/${path}`)
  }

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

      <Route path='/dashboard'>
        <Header heading="Dashboard" />
        <Selection>
          <Country
            country="United Kingdom"
            toPath="/dashboard/uk"
          />
          <Country
            country="USA"
            toPath="/dashboard/usa"
          />
          <Country
            country="Nigeria"
            toPath="/dashboard/nigeria"
          />
        </Selection>

        <Route path='/dashboard/uk'>
          <Dashboard country="United Kingdom">
            United Kingdom's Dashboard
          </Dashboard>
        </Route>

        <Route path='/dashboard/usa'>
          <Dashboard country="United State of America">
            USA's Dashboard
          </Dashboard>
        </Route>

        <Route path='/dashboard/nigeria'>
          <Dashboard country="Nigeria">
            Nigeria's Dashboard
          </Dashboard>
        </Route>
        <Footer />

      </Route>
    </Switch>



  );
}
