import React, { Component } from 'react';
import { stack as Menu } from 'react-burger-menu';

class SideDrawer extends Component {

  showSettings(event) {
    event.preventDefault();
  }

  render() {
    const styles = {
      bmCrossButton: {
        height: '24px',
        width: '24px',
        right: '35px'
      },
      bmCross: {
        background: '#ffffff',
      },
      bmMenu: {
        background: '#2f4050',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
      },
      bmMorphShape: {
        fill: '#2f4050'
      },
      bmItemList: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center'
      },
      bmItem: {
        color: 'aliceblue',
        textDecoration: 'none',
        margin: '8px'
      },
      bmOverlay: {
        background: '#2f4050',
        top: '0px'
      }
    }

    let list = (
      <Menu styles={styles} isOpen={this.props.open} customBurgerIcon={false}>
        <a id="home" className="menu-item" href="/home"> Home</a>
        <a id="appliances" className="menu-item" href="/appliances">Appliances</a>
        <a id="routines" className="menu-item" href="/routines">Routines</a>
        <a id="metrics" className="menu-item" href="/metrics">Metrics</a>
        <a id="account" className="menu-item" href="/account">Settings</a>
        <a id="logout" className="menu-item" href="/logout">Sign Out</a>
      </Menu>
    );

    if (!this.props.isAuth)
      list = null;

    return list;
  }
}

export default SideDrawer; 