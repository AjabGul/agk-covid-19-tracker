import React,{useEffect, useState} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
// Import Components 
import InfoBox from './components/InfoBox';
import MapContainer from './components/MapContainer'
import "leaflet/dist/leaflet.css";
import Table from './components/Table';
import { sortData, prettyPrintStat } from './components/util';
import LineGraph from './components/LineGraph';

import { 
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,

} from '@material-ui/core'


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
    const [ tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({lat: 37.090240, lng: -95.712891})
    const [mapZoom, setMapZoom] = useState(3); 
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");
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

        const sortedData = sortData(data);

        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
      };

      getCountriesData();

    }, []);

    const onCountryChange = async (e)=>{
        const countryCode = e.target.value;

        const url = countryCode === "wordwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url).then((response)=> response.json()).then((data) => {
          setCountry(countryCode);
          setCountryInfo(data);
        
          // on change country the map should move to that country
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
          console.log({lat : data.countryInfo.lat, lng : data.countryInfo.long})
          console.log("map center",mapCenter)
          console.log(countryCode)
          console.log(data)
        })
    };

    // console.log("country-->>> ", countryInfo);
  
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
                      className={"dropDown"}
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
                <InfoBox
                isRed
                active={casesType=== 'cases'}
                onClick={(e)=> setCasesType("cases")}
                title='Cases' 
                cases={prettyPrintStat(countryInfo.todayCases)} 
                total = {prettyPrintStat(countryInfo.cases)}/>

                <InfoBox
                active={casesType=== 'recovered'}
                onClick={(e)=> setCasesType("recovered")}
                title='Recovered' 
                cases={prettyPrintStat(countryInfo.todayRecovered)} 
                total = {prettyPrintStat(countryInfo.recovered)}/>

                <InfoBox
                isRed
                active={casesType === 'deaths'}
                onClick={(e)=> setCasesType("deaths")} 
                title='Deaths' 
                cases={ prettyPrintStat(countryInfo.todayDeaths)} 
                total = {prettyPrintStat(countryInfo.deaths)}/>
            </div>
            <MapContainer 
              casesType={casesType}
              countries={mapCountries}
              center={mapCenter} 
              zoom={mapZoom}
            />
          </div>
        </div>
        <div>
          <Card>
            <CardContent>
              <h3>Live cases by country</h3>
              <Table countries = {tableData}></Table>
              <h3>Worldwide New {casesType}</h3>
              <LineGraph casesType={casesType}/>
            </CardContent>
          </Card>
        </div>
    </div>
    );
  }

  export default App;
