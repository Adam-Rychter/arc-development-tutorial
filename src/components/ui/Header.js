import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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
        "&:hover": {
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
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: "white",
        borderRadius: "0px"
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    }

}))

export default function Header(props) {

    const classes = useStyles()
    const [selectedTab, setSelectedTab] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleTabSelection = (event, tabIndex) => {
        setSelectedTab(tabIndex)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true)
    }

    const handleMenuItemClick = (event, index) => {
        setAnchorEl(null)
        setOpen(false)
        setSelectedIndex(index)
    }

    const handleClose = (event) => {
        setAnchorEl(null)
        setOpen(false)
    }

    const menuOptions = [
        { name: "Services", link: "/services" },
        { name: "Custom Software Development", link: "/customsoftware" },
        { name: "Mobile App Development", link: "/mobileapps" },
        { name: "Website Development", link: "/websites" }]

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
                        <Button
                            disableRipple
                            component={Link}
                            to="/"
                            className={classes.logoContainer}
                            onClick={() => setSelectedTab(0)} >
                            <img alt='company logo' src={logo} className={classes.logo} />
                        </Button>
                        <Tabs
                            value={selectedTab}
                            className={classes.tabContainer}
                            onChange={handleTabSelection}
                            indicatorColor="primary" >
                            <Tab
                                className={classes.tab}
                                component={Link}
                                to="/"
                                label="Home" />
                            <Tab
                                aria-owns={anchorEl ? "simple-menu" : undefined}
                                aria-haspopup={anchorEl ? "true" : undefined}
                                className={classes.tab}
                                component={Link}
                                onMouseOver={event => handleClick(event)}
                                to="/services"
                                label="Services" />
                            <Tab
                                className={classes.tab}
                                component={Link}
                                to="/revolution"
                                label="The Revolution" />
                            <Tab
                                className={classes.tab}
                                component={Link}
                                to="/about"
                                label="About Us" />
                            <Tab
                                className={classes.tab}
                                component={Link}
                                to="/contact"
                                label="Contact Us" />
                        </Tabs>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}>
                            Free Estimate
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            classes={{ paper: classes.menu }}
                            MenuListProps={{ onMouseLeave: handleClose }}
                            elevation={0}>

                            {menuOptions.map((option, index) => (
                                <MenuItem key={option} component={Link}
                                to={option.link}
                                classes={{root: classes.menuItem}}
                                onClick={(event) => {handleMenuItemClick(event, index); setSelectedTab(1)}}
                                selected={index === selectedIndex && selectedTab === 1}>
                                    {option.name}
                                </MenuItem>
                            ))}

                        </Menu>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}