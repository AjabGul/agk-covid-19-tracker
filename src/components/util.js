import React from "react";
import numeral from "numeral";
import {Circle, Popup} from "react-leaflet";

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 400,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 600,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 1000,
    },
  };
  


export const sortData = (data)=> {

    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        }else{
            return 1;
        }
    })

    return sortedData;
};

// circles on the map using tooltips
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
          <h4>I am popup</h4>
      </Popup>
    </Circle>
  ));
