// import './App.css';
// import component 
import Header from './components/Header';
import InfoBox from './components/InfoBox';
import Map from './components/Map'

import { 
    makeStyles,
    Paper,
    Grid,
    Card,
    CardContent
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const StateStyle = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));

function App() {
    const classes = useStyles();
    const covidState = StateStyle();
  return (
    <div className="mainApp">
      <Grid container spacing={3}>
        <Grid item xs={8}>
            <Header />
        </Grid>
        <Grid item xs={4}>
            <Card className="app_right">
                <CardContent>
                {/* table */}
                <h3>Covid Cases Worlwide</h3>
                {/* graph */}
                <h3>Cases country wise</h3>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={8}>
            <div className={covidState.root}>
                <Paper elevation={0}>
                    <InfoBox title='Cases' cases={123} total = {2000}/>
                </Paper>
                <Paper elevation={3}>
                    <InfoBox title='Recovered' cases={123} total = {2000}/>
                </Paper>
                <Paper elevation={3}>
                    <InfoBox title='Total' cases={123} total = {2000}/>
                </Paper>
            </div>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
              <Map />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
