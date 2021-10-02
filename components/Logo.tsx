import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';
import DecorationTypography from './DecorationTypography';
import { makeStyles } from '@mui/styles';

  interface LogoProps {
      isForCompanies?: boolean;
      variantLogo?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline";
      variantCompanies?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline";
  }

  const useStyles = makeStyles({
    companies: {
      marginTop: "-0.5rem",
      textAlign: 'center'
    },
  }); 

const Logo = ({ isForCompanies=false, variantLogo="h5", variantCompanies="subtitle2" }: LogoProps) => {
    const classes = useStyles();
    return <Box sx={{ display: 'grid', gridTemplateRows: '2fr 1fr', rowGap: 0, }}>
        <Typography color="primary" variant={variantLogo}>Best Bride</Typography>
        <div className={classes.companies}>{isForCompanies && <DecorationTypography variant={variantCompanies} color="primary">dla firm</DecorationTypography>}</div>
    </Box>
}

export default Logo;