import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import React, {useState} from 'react'
import Login from './Login'
import {useStateValue} from "./StateProvider"

function App() {
  const [{user}, dispatch] = useStateValue()


  return (
    // BEM naming convention

    <div className="app">

      {!user ? (
        <Login/>
      ): (

      <div className="app__body">
        {/* router is where we tell the app to start lookind for the app switch are like cases and each case is the url youre accessing*/}
        <Router>
              <Sidebar />
          <Switch>
              {/* wild card (dont show the chat when there is no room id) this is saying regardless if your'e in forward slash room abc or room abc2 whatever it is allow you to render this i will pull the parameter */}
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            {/* always need todefine default room  */}
            <Route path="/">
              <Chat/>
            </Route>


          </Switch>
        </Router>

      </div>
)}

    </div>
  );
}

export default App;
