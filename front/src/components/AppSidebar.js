import React, {useContext, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {
    CCloseButton, CNavGroup, CNavItem,
    CSidebar,
    CSidebarBrand,
    CSidebarFooter,
    CSidebarHeader,
    CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {AppSidebarNav} from './AppSidebarNav'

import {logo} from 'src/assets/brand/logo'
import {sygnet} from 'src/assets/brand/sygnet'

// sidebar nav config
import _nav_dev from "src/_nav_dev";
import _nav_dev_admin from "src/_nav_dev_admin";
import {AuthModeDispatch, AuthModeInfo} from "src/layout/DefaultLayout";
import axios from "axios";

const AppSidebar = ({navi}) => {
    const dispatch = useDispatch()
    const unfoldable = useSelector((state) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sidebarShow)

    const [category, setCategory] = useState([]);
    const mode = useContext(AuthModeInfo)
    const [nav, setNav] = useState(navi)

    useEffect(() => {
        if (mode == 'ADMIN') {
            setNav(_nav_dev_admin)
        } else {
            setNav(navi)
        }
    }, [mode]);

    return (
        <CSidebar
            className="border-end"
            colorScheme="light"
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({type: 'set', sidebarShow: visible})
            }}
        >
            <CSidebarHeader className="border-bottom">
                <CSidebarBrand to="/">
                    <CIcon customClassName="sidebar-brand-full" icon={logo} height={32}/>
                    <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32}/>
                </CSidebarBrand>
                <CCloseButton
                    className="d-lg-none"
                    dark
                    onClick={() => dispatch({type: 'set', sidebarShow: false})}
                />
            </CSidebarHeader>
            <AppSidebarNav items={nav}/>
            <CSidebarFooter className="border-top d-none d-lg-flex">
                <CSidebarToggler
                    onClick={() => dispatch({type: 'set', sidebarUnfoldable: !unfoldable})}
                />
            </CSidebarFooter>
        </CSidebar>
    )
}

export default React.memo(AppSidebar)
