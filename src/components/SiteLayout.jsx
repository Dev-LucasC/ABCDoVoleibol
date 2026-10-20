import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavHeader from './NavHeader/NavHeader';
import Header from './Header';
import Footer from './footer/Footer';
import '../App.css';

export default function SiteLayout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return <><NavHeader /><Header /><Outlet /><Footer /></>;
}
