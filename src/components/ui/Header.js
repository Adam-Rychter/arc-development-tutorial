import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'

import logo from '../../assets/logo.svg'


function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em"
    },
    logo: {
        height: "8em"
    },
    logoContainer: {
        padding: 0,
        "&:hover":{
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.btnEstimate,
        borderRadius: "30px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px"
    },
    
}))

export default function Header(props) {

    const classes = useStyles()
    const [selectedTab, setSelectedTab] = useState(0)

    const handleTabSelection = (event, tabIndex) => {
        setSelectedTab(tabIndex)
    }

    useEffect(() => {
        if (window.location.pathname === "/" && selectedTab !== 0) {
            setSelectedTab(0)
        }
        if (window.location.pathname === "/services" && selectedTab !== 1) {
            setSelectedTab(1)
        }
        if (window.location.pathname === "/revolution" && selectedTab !== 2) {
            setSelectedTab(2)
        }
        if (window.location.pathname === "/about" && selectedTab !== 3) {
            setSelectedTab(3)
        }
        if (window.location.pathname === "/contact" && selectedTab !== 4) {
            setSelectedTab(4)
        }
    }, [selectedTab])

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed" >
                    <Toolbar disableGutters>
                        <Button disableRipple component={Link} to="/" className={classes.logoContainer} onClick={() => setSelectedTab(0)}>
                            <img alt='company logo' src={logo} className={classes.logo} />
                        </Button>
                        <Tabs value={selectedTab} className={classes.tabContainer} onChange={handleTabSelection} indicatorColor="primary">
                            <Tab className={classes.tab} component={Link} to="/" label="Home" />
                            <Tab className={classes.tab} component={Link} to="/services" label="Services" />
                            <Tab className={classes.tab} component={Link} to="/revolution" label="The Revolution" />
                            <Tab className={classes.tab} component={Link} to="/about" label="About Us" />
                            <Tab className={classes.tab} component={Link} to="/contact" label="Contact Us" />
                        </Tabs>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Free Estimate
                        </Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}