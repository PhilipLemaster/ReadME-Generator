const api = {
  getUser() {
    
    axios({
      method: 'get',
      url: `https://api.github.com/users/${unameInput}`,
    })
      .then(function(response) {
      var username = response.data.login;
      var profImgUrl = response.data.avatar_url;
      console.log(username);
      console.log(profImgUrl);
    });


  }
};

module.exports = api;
