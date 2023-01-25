import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { NavLink } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FactoryIcon from '@mui/icons-material/Factory';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import GroupsIcon from '@mui/icons-material/Groups';
import SetMealOutlinedIcon from '@mui/icons-material/SetMealOutlined';
import { Icon } from '@iconify/react';
import PushPinIcon from '@mui/icons-material/PushPin';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';



export default function MainListItems() {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  
    return(
      <React.Fragment>
    <ListItemButton component={NavLink} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="Master" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={NavLink} to="company" sx={{ pl: 4}}>
            <ListItemIcon >
              <FactoryIcon  fontSize="14"/>
            </ListItemIcon >
            <ListItemText primary="Company" primaryTypographyProps={{fontSize: 14}}/>
          </ListItemButton>
          <ListItemButton component={NavLink} to="fisher" sx={{ pl: 4 }}>
            <ListItemIcon>
            <Icon icon="game-icons:lucky-fisherman" color="#707070" width="21" height="21" />
            </ListItemIcon>
            <ListItemText primary="Fisherman" primaryTypographyProps={{fontSize: 14}} />
          </ListItemButton>
          <ListItemButton component={NavLink} to="captain" sx={{ pl: 4 }}>
            <ListItemIcon>
            <Icon icon="game-icons:captain-hat-profile" color="#707070" width="21" height="21" />
            </ListItemIcon>
            <ListItemText primary="Captain" primaryTypographyProps={{fontSize: 14}} />
          </ListItemButton>
          <ListItemButton component={NavLink} to="supplier" sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupsIcon  fontSize="14" />
            </ListItemIcon>
            <ListItemText primary="Supplier" primaryTypographyProps={{fontSize: 14}} />
          </ListItemButton>
          <ListItemButton component={NavLink} to="trader" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PeopleAltIcon  fontSize="14" />
            </ListItemIcon>
            <ListItemText primary="Traders" primaryTypographyProps={{fontSize: 14}} />
          </ListItemButton>
          <ListItemButton component={NavLink} to="fishing-ground" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PushPinIcon  fontSize="14" />
            </ListItemIcon>
            <ListItemText primary="Fishing Ground" primaryTypographyProps={{fontSize: 14}} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <SetMealOutlinedIcon  fontSize="14" />
            </ListItemIcon>
            <ListItemText primary="Species" primaryTypographyProps={{fontSize: 14}} />
          </ListItemButton>
        </List>
      </Collapse>
    <ListItemButton>
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="Port Sampling" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CurrencyExchangeIcon />
      </ListItemIcon>
      <ListItemText primary="Transaction" />
    </ListItemButton>
  </React.Fragment>
    );
  
}
  


