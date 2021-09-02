import React,{useEffect, useState} from 'react';
import './App.css';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { 
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
    const classes = useStyles();

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [ tabalData, SetTabalData] = useState([]);

    useEffect(()=>{
      fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
    }, []);

    useEffect(()=>{
      const getCountriesData = async ()=> {

        const apiResponse = await fetch('https://disease.sh/v3/covid-19/countries');
        const data = await apiResponse.json();

        const countries = data.map((country)=> ({
      
          name: country.country,
          value: country.countryInfo.iso2
            
        }));  
        setTabalData(data);
        setCountries(countries);
      };

      getCountriesData();

    }, []);

    const onCountryChange = async (e)=>{
        const countryCode = e.target.value;

        const url = countryCode === "wordwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url).then((response)=> response.json()).then((data) => {
          setCountry(countryCode);
          setCountryInfo(data);
        })
    };

    console.log("country-->>> ", countryInfo);
  
    return (
      <div className="app">
        <div className="app_left">
          <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                    AGK-COVID-19 Tracker
                  </Typography>
                  <FormControl >
                    <Select
                      style={{color:"white"}}
                      varient="outline"
                      value= {country}
                      onChange={onCountryChange}
                    >
                      <MenuItem value="worldwide"> worldwide </MenuItem>
                      {
                        countries.map((country)=>(
                          <MenuItem value={country.value}> {country.name} </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Toolbar>
              </AppBar>
              <div className="app_state">
                <InfoBox title='Cases' cases={countryInfo.todayCases} total = {countryInfo.cases}/>

                <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total = {countryInfo.recovered}/>

                <InfoBox title='Deaths' cases={ countryInfo.todayDeaths} total = {countryInfo.deaths}/>
            </div>
            <Map />
          </div>
        </div>
        <Card className="app_right">
          <CardContent>
            
            <h3>Covid Cases Worlwide</h3>
          {/* graph */}
            <h3>Cases country wise</h3>
          </CardContent>
        </Card>
    </div>
    );
  }

  export default App;
