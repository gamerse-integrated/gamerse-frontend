const setOnlineStatus = () => {
  onmessage = (email) => {
    setInterval(() => {
      fetch(process.env.REACT_APP_BASE_URL + "player.php", {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
      });
    }, 4 * 1000);
  };
};

export default setOnlineStatus;

// no imports, fetch, postmessage
