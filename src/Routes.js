import { Switch, Route, Redirect } from "react-router-dom";
import Login from "@auth/login/Login";
import Register from "@auth/register/Register";
import ForgotPassword from "@auth/forgotPassword/ForgotPassword";
import Home from "@main/Home";
import TicTacToeRouter from "@main/TicTacToeRouter";
import Snakes from "@main/snakes/Snakes";
import TTTeasy from "@main/tictactoe/TTTeasy";
import TTTai from "@main/tictactoe/TTTai";
import TTTfriend from "@main/tictactoe/TTTfriend";
import TTThuman from "@main/tictactoe/TTThuman";
import Friends from "@main/friends/Friends";
import { Explore } from "@components/main/explore/Explore";

const USER_AUTHENTICATED = (
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/friends" component={Friends}></Route>
    <Route exact path="/explore" component={Explore}></Route>
    <Route exact path="/tictactoe" component={TicTacToeRouter}></Route>
    <Route exact path="/snakes" component={Snakes}></Route>
    <Route exact path="/ttteasy" component={TTTeasy}></Route>
    <Route exact path="/ttthuman" component={TTThuman}></Route>
    <Route exact path="/tttfriend" component={TTTfriend}></Route>
    <Route exact path="/tttai" component={TTTai}></Route>

    <Redirect to="/" />
  </Switch>
);

const USER_NOT_AUTHENTICATED = (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/forgot" component={ForgotPassword} />
    <Redirect to="/login" />
  </Switch>
);

export { USER_AUTHENTICATED, USER_NOT_AUTHENTICATED };
