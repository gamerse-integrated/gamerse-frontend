const setOnlineStatus = () => {
  onmessage = ({ data }) => {
    setInterval(() => {
      fetch("https://gamerse.infinityfreeapp.com/api/player.php", {
        // fetch(process.env.REACT_APP_BASE_URL + "player.php", {
        // fetch(process.env.PUBLIC_URL + "/api/player.php", {
        method: "POST",
        body: JSON.stringify({
          email: data,
        }),
      });
    }, 10 * 1000);
  };
};

export default setOnlineStatus;
