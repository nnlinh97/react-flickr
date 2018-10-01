const API_KEY = "8847b916915e4a7f6d79977e23ab6c1f";
export const URL = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&extras=url_s%2Cowner_name%2Cviews&per_page=20&format=json&nojsoncallback=1&page=`;
export const CSS = {
    containerWidth: 1087,
    containerPadding: 0,
    boxSpacing: {
        horizontal: 5,
        vertical: 5
    }
}