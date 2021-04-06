import React, {useEffect, useState} from 'react';
import './Header.css';
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import Logo from './images/logo.jpg';
import {firebaseApp} from "./firebase";

const auth = firebaseApp.auth();
const realtimedb = firebaseApp.database();
var flag = false;
function Header() {

    const [{basket, user}, dispatch] = useStateValue();
    const [query, SetQuery] = useState(null);
    const [search_list, SetSearchList] = useState(null);
    const history = useHistory();

    const handleAuthentication = () =>{
        if (user){
            console.log("current user exist");
            auth.signOut().then(console.log("logged out"));
        }
    }

    useEffect(() =>{
        const postRef = realtimedb.ref("users");
        
        postRef.on("value", (snapshot) => {
            const each_post = snapshot.val();
            const post_list = [];
            for (let id in each_post){
                if(user && each_post[id].email == user.email){
                    if(each_post[id].type === "Seller"){
                        flag=true;
                        console.log("flag=true");
                        console.log("post type="+each_post[id].type);
                    }
                }
            }
        });
    }, []);

    
    const saveQueryAtLocal = e => {
        e.preventDefault();

        const myStorage = window.localStorage;
        myStorage.setItem('Query', query);
        console.log("setItem:"+query);
        history.push("/search");
    }


    return (
        <div className="header">
            <Link to="/" style={{ textDecoration: 'none' }}>    
                <span className="header__logo">Empire Market</span>
            </Link>

            <div className="header__search">
                <input className="header__searchInput" type="text" value={query} onChange={e => SetQuery(e.target.value)}/>
                <Link to="/search">
                    <button className="header__searchIcon" onClick={saveQueryAtLocal}><SearchIcon /></button>
                </Link>
            </div>

            <div className="header__nav">
                <Link to="/admin" style={{ textDecoration: 'none' }}>
                    <div className="header__option">
                        <span className="header__optionLineOne">
                            Go to
                        </span>
                        <span className="header__optionLineTwo">
                            Admin
                        </span>
                    </div>
                </Link>
                <Link to={!user && "/login"} style={{ textDecoration: 'none' }}>
                    <div onClick={handleAuthentication} className="header__option">
                        <span className="header__optionLineOne">
                            Hello {!user ? 'Guest' : user.email}
                        </span>
                        <span className="header__optionLineTwo">
                            {user ? 'Sign Out':'Sign In'}
                        </span>
                    </div>
                </Link>
                <Link to="/product" style={{ textDecoration: 'none' }}>
                    <div className="header__option">
                        <span className="header__optionLineOne">
                            {!user ? 'Guest' : user.email} 's
                        </span>
                        <span className="header__optionLineTwo">
                            Products
                        </span>
                    </div>
                </Link >
                <Link to="/upload" style={{ textDecoration: 'none' }}>
                    <div className="header__option">
                        <span className="header__optionLineOne">
                            Upload
                        </span>
                        <span className="header__optionLineTwo">
                            Product
                        </span>
                    </div>
                </Link>
                <Link to="/checkout" style={{ textDecoration: 'none' }}>
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
