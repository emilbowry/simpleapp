import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import styles from './TitleBar.module.css';
import { Menu } from 'lucide-react';
// export default function TitleBar() {

export const TitleBar: React.FC = () => {


  const [open, setOpen] = React.useState(false);

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logoLink} onClick={() => setOpen(false)}>
        <img src={logo} alt="Logo" className={styles.logo}/>
      </NavLink>

      <button
        className={styles.hamburger}
        onClick={() => setOpen(o => !o)}
        aria-label="Menu"
      >
        <Menu size={24} />
        {/* <span className={styles.bar}/>
        <span className={styles.bar}/>
        <span className={styles.bar}/> */}
        {/* <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div> */}
      </button>

      <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
        <button
          className={styles.close}
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >×</button>

        <NavLink to="/"        className={({isActive})=>isActive?styles.activeLink:styles.link} onClick={()=>setOpen(false)}>Home</NavLink>
        <NavLink to="/founder" className={({isActive})=>isActive?styles.activeLink:styles.link} onClick={()=>setOpen(false)}>Founder</NavLink>
        <NavLink to="/contact" className={({isActive})=>isActive?styles.activeLink:styles.link} onClick={()=>setOpen(false)}>Contact</NavLink>
      </nav>
    </header>
);
}