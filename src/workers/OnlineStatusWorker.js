const setOnlineStatus = () => {
  onmessage = ({ data }) => {
    setInterval(() => {
      fetch("https://gamersenish.000webhostapp.com/api/player.php", {
        method: "POST",
        body: JSON.stringify({
          email: data,
        }),
      });
    }, 10 * 1000);
  };
};

export default setOnlineStatus;
