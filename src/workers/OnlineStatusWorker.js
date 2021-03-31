const setOnlineStatus = () => {
  onmessage = ({ data }) => {
    setInterval(() => {
      fetch(process.env.REACT_APP_BASE_URL + "player.php", {
        method: "POST",
        body: JSON.stringify({
          email: data,
        }),
      });
    }, 4 * 1000);
  };
};

export default setOnlineStatus;
