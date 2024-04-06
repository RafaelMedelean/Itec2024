import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

const SidebarReact = ({ role }) => {
    return (
        <Sidebar>
        <Menu>
            <MenuItem>Dashboard</MenuItem>
            {role === 'developer' && <MenuItem>Solve a bug</MenuItem>}
            {role === 'user' && <MenuItem>Report a bug</MenuItem>}

        </Menu>
        </Sidebar>
    );
  };
  
  export default SidebarReact;

