const axios = require('axios').default;

const fields = 'permalink,media_type,media_url, caption, children{media_url}';
const access_token = '';
// Make a request for a user with a given ID

exports.instaFetch = async function (after = '', limit = 20) {
	return await axios
		.get(
			`https://graph.instagram.com/me/media?fields=${fields}&access_token=${access_token}&after=${after}&limit=${limit}`
		)
		.then(function (response) {
			// handle success
			return response.data;
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		});
};

exports.userFetch = async function (after = '', limit = 20) {
	return await axios
		.get(`https://graph.instagram.com/me?fields=media_count&access_token=${access_token}`)
		.then(function (response) {
			// handle success
			return response.data;
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		});
};
