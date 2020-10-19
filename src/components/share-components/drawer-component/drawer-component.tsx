import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import StarBorder from '@material-ui/icons/StarBorder';
// import EventNoteIcon from '@material-ui/icons/EventNote';
// import PostAddIcon from '@material-ui/icons/PostAdd';
import Collapse from '@material-ui/core/Collapse';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EventIcon from '@material-ui/icons/Event';
import {
	Link
} from 'react-router-dom';
import './drawer-component.css';
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		nested: {
			paddingLeft: theme.spacing(4),
		},
		root: {
			display: 'flex',
		},
		appBar: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.default,
			padding: theme.spacing(3),
		},
	})
);

export default function PermanentDrawerLeft() {
 const classes = useStyles();
 const [open, setOpen] = React.useState(true);
  const [openEvent, setOpenEvent] = React.useState(true);
    const [openRegister, setOpenRegister] = React.useState(true);
  const [openFeature, setOpenFeature] = React.useState(true);
 const handleClick = () => {
		setOpen(!open);
  };
  const handleClickEvent = () => {
    setOpenEvent(!openEvent);
  }
  const handleClickRegister = () => {
    setOpenRegister(!openRegister)
  }
  const handleClickFeature = () => {
    setOpenFeature(!openFeature);
  }
  
  React.useEffect(() => {
    setOpen(false);
    setOpenEvent(false);
    setOpenFeature(false);
    setOpenRegister(false);
		}, []);
  return (
		<>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" noWrap>
						MVAGroup Administrators Page
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
        anchor="left">
        <div className=" d-flex justify-content-center mt-4">
        <h4><strong>ADMIN</strong></h4>

        </div>
        <div className={classes.toolbar} />
				<Divider />

				<ListItem button onClick={handleClickEvent}>
					<ListItemIcon>
						<EventIcon style={{ color: 'white' }} />
					</ListItemIcon>
					<ListItemText primary="Events" />
					{openEvent ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openEvent} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem className={classes.nested} button>
							<Link to="/events">Show event</Link>
						</ListItem>
						<ListItem button className={classes.nested}>
							<Link to="/insert_event">Add event</Link>
						</ListItem>
					</List>
				</Collapse>
				<ListItem button onClick={handleClickRegister}>
					<ListItemIcon>
						<AccountBoxIcon style={{ color: 'white' }} />
					</ListItemIcon>
					<ListItemText primary="Registers" />
					{openRegister ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openRegister} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button className={classes.nested}>
							<Link to="/registers">Show registers</Link>
						</ListItem>
					</List>
				</Collapse>
				<ListItem button onClick={handleClick}>
					<ListItemIcon>
						<InsertCommentIcon style={{ color: 'white' }} />
					</ListItemIcon>
					<ListItemText primary="Comments" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button className={classes.nested}>
							{/* <ListItemIcon>
								<InsertCommentIcon />
							</ListItemIcon> */}
							<Link to="/ano_comments">Show comments</Link>
						</ListItem>
					</List>
				</Collapse>
				<ListItem button onClick={handleClickFeature}>
					<ListItemIcon>
						<InboxIcon style={{ color: 'white' }} />
					</ListItemIcon>
					<ListItemText primary="Feature" />
					{openFeature ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openFeature} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button className={classes.nested}>
							{/* <ListItemIcon>
								<StarBorder />
							</ListItemIcon> */}
							<Link to="/features">Show feature</Link>
						</ListItem>
					</List>
				</Collapse>
			</Drawer>
			{/* <main className={classes.content}>
				<div className={classes.toolbar} />
			
			</main> */}
		</>
	);
}
