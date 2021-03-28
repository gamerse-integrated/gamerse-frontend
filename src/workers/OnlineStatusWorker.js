const setOnlineStatus = () => {
  onmessage = ({ data }) => {
    setInterval(() => {
      console.log(data);
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

// no imports, fetch, postmessage
