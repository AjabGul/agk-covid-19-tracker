import React from 'react';
import {
    makeStyles,
    Card,
    CardContent,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      minWidth: 100,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function InfoBox({title, cases, total}) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary">
                {title}
            </Typography>
            <Typography variant="h6" component="h2">
                {cases}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                {total} Total
            </Typography>
        </CardContent>
    </Card>
    )
}

export default InfoBox;
