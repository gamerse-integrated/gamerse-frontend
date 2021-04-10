const setOnlineStatus = () => {
  onmessage = ({ data }) => {
    setInterval(() => {
      fetch(window.location.hostname + "/api/player.php", {
        method: "POST",
        body: JSON.stringify({
          email: data,
        }),
      });
    }, 10 * 1000);
  };
};

export default setOnlineStatus;
